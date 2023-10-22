import base64
import datetime

from django.test import Client
from django.test import TestCase
from pydantic.datetime_parse import timezone
from django.contrib.auth.models import User

from .tests_auth import create_active_user
from ..models import {{ domain_models | map(attribute='name') | join(', ') }}

UPDATED_DESIGNATION = 'HR'
{% set translation_string = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ' %}

{% for model in domain_models %}
class {{ model.name }}RestTest(TestCase):

    base_path = '/api/{{helpers.to_kebab_case(model.name) | lower }}'

    def setUp(self):
        _, basic_auth_header = create_active_user()
        self.client = Client(HTTP_AUTHORIZATION=basic_auth_header)

    def test_get_all(self):
        # GIVEN
        record = self.create_persisted()
        # WHEN
        response = self.client.get(self.base_path)
        # THEN
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['id'], record.id)
        {% for field in model.fields %}self.assertEqual(response.json()[0]['{{ field.name }}'], record.{{ field.name }})
        {% endfor %}{% for relation in model.relations %}self.assertEqual(response.json()[0]['{{ relation.name }}']['id'], record.{{ relation.name }}.id)
        {% endfor %}

    def test_get_all_should_return_empty_list(self):
        # WHEN
        response = self.client.get(self.base_path)
        # THEN
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_get_by_id_existing(self):
        # GIVEN
        record = self.create_persisted()
        # WHEN
        response = self.client.get(self.base_path + f'/{record.id}')
        # THEN
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['id'], record.id)
        {% for field in model.fields %}self.assertEqual(response.json()['{{ field.name }}'], record.{{ field.name }})
        {% endfor %}{% for relation in model.relations %}self.assertEqual(response.json()['{{ relation.name }}']['id'], record.{{ relation.name }}.id)
        {% endfor %}

    def test_get_by_id_non_existing(self):
        # GIVEN
        id = 999
        # WHEN
        response = self.client.get(self.base_path + f'/{id}')
        # THEN
        self.assertEqual(response.status_code, 404)

    def test_post_valid(self):
        # GIVEN
        payload = self.create()
        # WHEN
        response = self.client.post(self.base_path, payload, content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 201)
        id = response.json().get("id")
        self.assertIsNotNone(response.json().get("id"))
        record = {{ model.name }}.objects.filter(id=id).first()
        self.assertIsNotNone(record)
        {% for field in model.fields %}self.assertEqual(response.json()['{{ field.name }}'], record.{{ field.name }}{% if field.data_type.value == 'date' %}.isoformat()[:10]{% elif field.data_type.value == 'datetime'%}.isoformat()[:23] + 'Z'{% endif %})
        {% endfor %}{% for relation in model.relations %}self.assertEqual(response.json()['{{ relation.name }}']['id'], record.{{ relation.name }}.id)
        {% endfor %}

    def test_post_invalid(self):
        # GIVEN
        payload = self.create()
        {% for field in model.fields %}{% if field.required %}payload["{{field.name}}"] = None
        {% endif %}{% endfor %}{% for relation in model.relations %}{% if relation.required %}payload["{{relation.name}}_id"] = None
        {% endif %}{% endfor %}
        # WHEN
        response = self.client.post(self.base_path, payload, content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 422)

    def test_put_with_existing_valid(self):
        # GIVEN
        id = self.create_persisted().id
        payload = self.create_updated()
        # WHEN
        response = self.client.put(self.base_path + f'/{id}', payload, content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 200)
        record = {{ model.name }}.objects.filter(id=id).first()
        self.assertIsNotNone(record)
        {% for field in model.fields %}self.assertEqual(response.json()['{{ field.name }}'], record.{{ field.name }}{% if field.data_type.value == 'date' %}.isoformat()[:10]{% elif field.data_type.value == 'datetime'%}.isoformat()[:23] + 'Z'{% endif %})
        {% endfor %}{% for relation in model.relations %}self.assertEqual(response.json()['{{ relation.name }}']['id'], record.{{ relation.name }}.id)
        {% endfor %}

    def test_put_existing_invalid(self):
        # GIVEN
        payload = self.create()
        record = self.create_persisted(payload)
        {% for field in model.fields %}{% if field.required %}payload["{{field.name}}"] = None
        {% endif %}{% endfor %}{% for relation in model.relations %}{% if relation.required %}payload["{{relation.name}}_id"] = None
        {% endif %}{% endfor %}
        # WHEN
        response = self.client.put(self.base_path + f'/{record.id}', payload, content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 422)

    def test_put_non_existing(self):
        # GIVEN
        id = 999
        payload = self.create()
        # WHEN
        response = self.client.put(self.base_path + f'/{id}', payload, content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 404)

    def test_delete_existing(self):
        # GIVEN
        id = self.create_persisted().id
        # WHEN
        response = self.client.delete(self.base_path + f'/{id}')
        # THEN
        self.assertEqual(response.status_code, 204)
        record = {{ model.name }}.objects.filter(id=id).first()
        self.assertIsNone(record)

    def test_delete_non_existing(self):
        # GIVEN
        id = 999
        # WHEN
        response = self.client.delete(self.base_path + f'/{id}')
        # THEN
        self.assertEqual(response.status_code, 404)

    @staticmethod
    def create_persisted(model: dict = None) -> {{ model.name }}:
        if model is None:
            model = {{ model.name }}RestTest.create()
        return {{ model.name }}.objects.create(**model)

    @staticmethod
    def create():
        return {
            {% for field in model.fields %}'{{ field.name }}': {% if field.data_type.value == 'str' and field.max_len %}'{% for i in range(field.max_len) %}{{translation_string[i % 52]}}{% endfor %}',
            {% elif field.data_type.value == 'str' %}'{{translation_string}}',
            {% elif field.data_type.value == 'int' %}{{79}},
            {% elif field.data_type.value == 'float' %}{{79.312}},
            {% elif field.data_type.value == 'date' %}datetime.datetime.now(tz=timezone.utc).isoformat()[:10],
            {% elif field.data_type.value == 'datetime' %}datetime.datetime.now(tz=timezone.utc).isoformat()[:23] + 'Z',
            {% endif %}{% endfor %}{% for relation in model.relations %}'{{ relation.name }}_id': {{relation.data_type}}RestTest.create_persisted().id, {% endfor %}}

    @staticmethod
    def create_updated():
        return {
            {% for field in model.fields %}'{{ field.name }}': {%if field.data_type.value == 'str' and field.max_len %}'{% for i in range(field.max_len) | reverse %}{{translation_string[i % 52]}}{% endfor %}',
            {% elif field.data_type.value == 'str'%}'{{translation_string | reverse}}',
            {% elif field.data_type.value == 'int'%}{{789}},
            {% elif field.data_type.value == 'float'%}{{423.33}},
            {% elif field.data_type.value == 'date'%}'2023-05-04',
            {% elif field.data_type.value == 'datetime'%}'2023-05-04T23:33:24.691Z',
            {% endif %}{% endfor %}{% for relation in model.relations %}'{{ relation.name }}_id': {{ relation.data_type }}RestTest.create_persisted().id,{% endfor %}}

{% endfor %}

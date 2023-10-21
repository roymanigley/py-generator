from typing import List

from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from ninja import NinjaAPI
from ninja.security import django_auth
from .auth import ApiBasicAuth
from .errors import default_errors, register as register_errors
from .models import {{ domain_models | map(attribute='name') | join(', ') }}
from .schemas import {% for model in domain_models %}{{ model.name }}SchemaOut, {{ model.name }}SchemaIn{{ ', ' if not loop.last else '' }}{% endfor %}


api = NinjaAPI(csrf=True, auth=[django_auth, ApiBasicAuth()], urls_namespace='api')

register_errors(api)

{% for model in domain_models %}
class {{ model.name }}Resource:

    base_path = '{{ model.name | lower }}'
    tag = '{{ model.name }}'

    @staticmethod
    def register(api: NinjaAPI):

        @api.get({{ model.name }}Resource.base_path, tags=[{{ model.name }}Resource.tag], summary='returns all records',  response={200: List[{{ model.name }}SchemaOut], **default_errors})
        def find_all(request: HttpRequest):
            return 200, {{ model.name }}.objects.all()

        @api.get({{ model.name }}Resource.base_path + '/{id}', tags=[{{ model.name }}Resource.tag], summary='retrieves a single record by id', response={200: {{ model.name }}SchemaOut, **default_errors})
        def find_by_id(request: HttpRequest, id: int):
            return 200, get_object_or_404({{ model.name }}, id=id)

        @api.post({{ model.name }}Resource.base_path, tags=[{{ model.name }}Resource.tag], summary='creates a new record', response={201: {{ model.name }}SchemaOut, **default_errors})
        def create(request: HttpRequest, payload: {{ model.name }}SchemaIn):
            return 201, {{ model.name }}.objects.create(**payload.__dict__)

        @api.put({{ model.name }}Resource.base_path + '/{id}', tags=[{{ model.name }}Resource.tag], summary='updates an existing record', response={200: {{ model.name }}SchemaOut, **default_errors})
        def update(request: HttpRequest, payload: {{ model.name }}SchemaIn, id: int):
            record = get_object_or_404({{ model.name }}, id=id)
            for attr, val in payload.dict().items():
                setattr(record, attr, val)
            record.save()
            return 200, record

        @api.delete({{ model.name }}Resource.base_path + '/{id}', tags=[{{ model.name }}Resource.tag], summary='deletes a record', response={204: None, **default_errors})
        def delete(request: HttpRequest, id: int):
            get_object_or_404({{model.name}}, id=id).delete()
            return 204, None

{% endfor %}
{% for model in domain_models %}{{ model.name }}Resource.register(api)
{% endfor %}
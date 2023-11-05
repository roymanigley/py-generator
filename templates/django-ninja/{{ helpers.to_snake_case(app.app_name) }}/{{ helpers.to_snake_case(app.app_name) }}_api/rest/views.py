{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{helpers.to_snake_case(model.name)}}.py"}
from typing import List

from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Query
from ninja.pagination import paginate
from ..errors import default_errors
from ..models import {{ model.name }}
from ..schemas import {{ model.name }}SchemaIn, {{ model.name }}SchemaOut, {{ model.name }}Filter

class {{ model.name }}Resource:

    base_path = '{{ helpers.to_kebab_case(model.name) }}'
    tag = '{{ model.name }}'

    @staticmethod
    def register(api: NinjaAPI):

        @api.get({{ model.name }}Resource.base_path, tags=[{{ model.name }}Resource.tag], summary='returns all records',  response={200: List[{{ model.name }}SchemaOut], **default_errors})
        @paginate(page_size=20)
        def find_all(request: HttpRequest, filters : {{ model.name }}Filter = Query(...)):
            return filters.filter({{ model.name }}.objects.all())

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
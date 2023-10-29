from typing import Optional

from ninja import schema, FilterSchema, Field
from datetime import date, datetime
from .models import *
{% for model in domain_models %}
class {{ model.name }}SchemaOut(schema.Schema):
    id: int
    {% for field in model.fields %}{{ field.name }}: {{ field.data_type.value }}
    {% endfor %}{% for relation in model.relations %}{{ relation.name }}: {{ relation.data_type }}SchemaOut
    {% endfor %}

class {{ model.name }}SchemaIn(schema.Schema):
    {% for field in model.fields %}{{ field.name }}: {{ field.data_type.value }}
    {% endfor %}{% for relation in model.relations %}{{ relation.name }}_id: int
    {% endfor %}

class {{ model.name }}Filter(FilterSchema):
    id: Optional[int]
    {% for field in model.fields %}{{ field.name }}: Optional[{{ field.data_type.value }}]{% if field.data_type.value == 'str'%} = Field(q='{{field.name}}__icontains'){% endif %}
    {% endfor %}{% for relation in model.relations %}{{ relation.name }}_id: Optional[int]
    {% endfor %}{% endfor %}
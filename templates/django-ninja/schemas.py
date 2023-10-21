from ninja import schema
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
    {% endfor %}{% for relation in model.relations %}{{ relation.name | lower }}_id: int{% endfor %}
    {% endfor %}
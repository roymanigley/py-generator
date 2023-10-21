from django.db import models


{% for model in domain_models %}
class {{ model.name }}(models.Model):
    {% for field in model.fields %}{% if field.data_type.value == 'str' and field.max_len %}{{ field.name }} = models.CharField(null={{ not field.required }}, blank=False, max_length={{ field.max_len}})
    {% elif field.data_type.value == 'str' %}{{ field.name }} = models.TextField(null={{ not field.required }}, blank=False)
    {% elif field.data_type.value == 'int' %}{{ field.name }} = models.IntegerField(null={{ not field.required }})
    {% elif field.data_type.value == 'float' %}{{ field.name }} = models.FloatField(null={{ not field.required }})
    {% elif field.data_type.value == 'date' %}{{ field.name }} = models.DateField(null={{ not field.required }})
    {% elif field.data_type.value == 'datetime' %}{{ field.name }} = models.DateTimeField(null={{ not field.required }})
    {% endif %}{% endfor %}{% for relation in model.relations %}{{ relation.name }} = models.ForeignKey({{ relation.data_type }},null={{ not relation.required }}, on_delete=models.DO_NOTHING)
{% endfor %}
{% endfor %}
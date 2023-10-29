{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{helpers.to_kebab_case(model.name)}}.ts"}
{% for relation in model.relations %}import { {{ relation.data_type }} } from "./{{ helpers.to_kebab_case(relation.data_type) }}";
{% endfor %}
export class {{ model.name }} {
    id?: number;
    {% for field in model.fields %}
    {{ field.name }}?: {% if field.data_type.value == 'str' %}string{% elif field.data_type.value in ['int', 'float']%}number{% elif field.data_type.value in ['date', 'datetime'] %}Date{% endif %};
    {% endfor %}{% for relation in model.relations %}
    {{ relation.name }}?: {{ relation.data_type }};
    {% endfor %}
}

export class {{ model.name }}Payload {
    {% for field in model.fields %}
    {{ field.name }}?: {% if field.data_type.value == 'str' %}string{% elif field.data_type.value in ['int', 'float']%}number{% elif field.data_type.value in ['date', 'datetime'] %}Date{% endif %};
    {% endfor %}{% for relation in model.relations %}
    {{ relation.name }}_id?: number;
    {% endfor %}
}
{% endfor %}
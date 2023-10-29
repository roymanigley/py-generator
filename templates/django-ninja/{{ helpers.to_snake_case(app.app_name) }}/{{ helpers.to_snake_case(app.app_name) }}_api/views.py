from ninja import NinjaAPI
from ninja.security import django_auth
from .auth import ApiBasicAuth
from .errors import register as register_errors
{%for model in domain_models %}from .rest.{{ helpers.to_snake_case(model.name)}} import {{ model.name }}Resource
{% endfor %}

api = NinjaAPI(csrf=True, auth=[django_auth, ApiBasicAuth()], urls_namespace='api')

register_errors(api)
{% for model in domain_models %}{{ model.name }}Resource.register(api)
{% endfor %}
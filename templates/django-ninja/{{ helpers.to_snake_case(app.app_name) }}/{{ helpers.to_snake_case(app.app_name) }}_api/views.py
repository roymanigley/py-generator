from ninja import NinjaAPI
from ninja.security import django_auth
from .auth import ApiBasicAuth
from .errors import register as register_errors
from .rest.account import AccountResource
{%for model in domain_models %}from .rest.{{ helpers.to_snake_case(model.name)}} import {{ model.name }}Resource
{% endfor %}

api = NinjaAPI(csrf=True, auth=[django_auth, ApiBasicAuth()], urls_namespace='api')
# TODO: token based auth for rest calls
api._validate = lambda self=None: None
api.csrf=False

register_errors(api)
AccountResource.register(api)
{% for model in domain_models %}{{ model.name }}Resource.register(api)
{% endfor %}
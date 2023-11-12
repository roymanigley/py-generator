from ninja import NinjaAPI
from django.http import HttpRequest


class AccountResource:

    @staticmethod
    def register(api: NinjaAPI):
        @api.get('/account')
        def account(request: HttpRequest):
            return {'username': request.user.username}

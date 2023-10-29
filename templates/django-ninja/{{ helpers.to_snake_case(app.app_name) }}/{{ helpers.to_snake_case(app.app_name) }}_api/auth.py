from typing import Optional, Any

from django.contrib.auth.models import User
from django.http import HttpRequest
from ninja.security import HttpBasicAuth


class ApiBasicAuth(HttpBasicAuth):
    def authenticate(self, request: HttpRequest, username: str, password: str) -> Optional[Any]:
        user = User.objects.filter(username=username, is_active=True).first()
        if user is not None and user.check_password(password):
            return user.username
        else:
            return None


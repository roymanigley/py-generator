import base64

from django.contrib.auth.models import User
from django.http import HttpRequest
from django.test import Client
from django.test import TestCase

from ..views import api


@api.get('/login-check')
def login_check(request: HttpRequest):
    return 200, {'detail': 'welcome !'}


def create_active_user(username='admin', password='admin') -> (User, str):
    basic_auth_header = base64.encodebytes(f'{username}:{password}'.encode('utf-8')).decode('utf-8')
    return User.objects.create_user(username=username, password=password), basic_auth_header


class ChildEntityRestTest(TestCase):

    def test_login_with_active_user(self):
        # GIVEN
        _, basic_auth_header = create_active_user()
        self.client = Client(HTTP_AUTHORIZATION=basic_auth_header)
        # WHEN
        response = self.client.get('/api/login-check')
        # THEN
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['detail'], 'welcome !')

    def test_login_with_inactive_user(self):
        # GIVEN
        user, basic_auth_header = create_active_user()
        user.is_active = False
        user.save()
        self.client = Client(HTTP_AUTHORIZATION=basic_auth_header)
        # WHEN
        response = self.client.get('/api/login-check')
        # THEN
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['detail'], 'Unauthorized')

    def test_login_without_credentials(self):
        # GIVEN
        _, basic_auth_header = create_active_user()
        self.client = Client()
        # WHEN
        response = self.client.get('/api/login-check')
        # THEN
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['detail'], 'Unauthorized')

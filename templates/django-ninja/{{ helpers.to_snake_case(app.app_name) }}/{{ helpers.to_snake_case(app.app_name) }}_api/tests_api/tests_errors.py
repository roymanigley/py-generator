from django.http import Http404, HttpRequest
from django.test import Client
from django.test import TestCase
from ninja.errors import ValidationError

from {{ helpers.to_snake_case(app.app_name) }}_api.errors import default_errors, CustomAPIException
from {{ helpers.to_snake_case(app.app_name) }}_api.views import api

ERROR_MESSAGE_400 = 'bad request error'
ERROR_MESSAGE_404 = 'could not be found'
ERROR_MESSAGE_422 = 'unprocessable entity'
ERROR_MESSAGE_500 = 'internal server error'


@api.get('/errors/400', auth=None, response={**default_errors})
def error400(request: HttpRequest):
    raise CustomAPIException.bad_request(ERROR_MESSAGE_400)


@api.get('/errors/404', auth=None, response={**default_errors})
def error404(request: HttpRequest):
    raise Http404(ERROR_MESSAGE_404)


@api.get('/errors/422', auth=None, response={**default_errors})
def error404(request: HttpRequest):
    raise ValidationError(ERROR_MESSAGE_422)


@api.get('/errors/500', auth=None, response={**default_errors})
def error404(request: HttpRequest):
    raise Exception(ERROR_MESSAGE_500)


class ErrorTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_400(self):
        # WHEN
        response = self.client.get('/api/errors/400')
        # THEN
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['title'], 'error.bad-request')
        self.assertEqual(response.json()['detail'], ERROR_MESSAGE_400)
        self.assertEqual(response.json()['status'], 400)

    def test_404(self):
        # WHEN
        response = self.client.get('/api/errors/404')
        # THEN
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['title'], 'error.not-found')
        self.assertEqual(response.json()['detail'], ERROR_MESSAGE_404)
        self.assertEqual(response.json()['status'], 404)

    def test_422(self):
        # WHEN
        response = self.client.get('/api/errors/422')
        # THEN
        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.json()['title'], 'error.validation-error')
        self.assertEqual(response.json()['detail'], ERROR_MESSAGE_422)
        self.assertEqual(response.json()['status'], 422)

    def test_500(self):
        # WHEN
        response = self.client.get('/api/errors/500')
        # THEN
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json()['title'], 'error.unknown')
        self.assertEqual(response.json()['detail'], ERROR_MESSAGE_500)
        self.assertEqual(response.json()['status'], 500)


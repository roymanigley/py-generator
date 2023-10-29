from django.urls import path
from {{ helpers.to_snake_case(app.app_name) }}_api.views import api

urlpatterns = [
    path('api/', api.urls)
]

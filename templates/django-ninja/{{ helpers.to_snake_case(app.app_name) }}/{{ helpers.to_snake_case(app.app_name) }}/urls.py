from django.contrib import admin
from django.urls import path
from {{ helpers.to_snake_case(app.app_name) }}_api.urls import urlpatterns as api_urls

urlpatterns = [
    path('admin/', admin.site.urls),
] + api_urls

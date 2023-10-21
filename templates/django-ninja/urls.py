from django.urls import path
from experiment_app.views import api

urlpatterns = [
    path('api/', api.urls)
]

# PyGenerator
> code generator for django projects

## Usage

### Pre requirements

- angular cli
- python
- django

## Features

### Backend (Django)

- CRUD endpoints
- Swagger UI (`/api/docs`)
- Schemas
- Models
- Exception Handling
- Unit Tests
- Authentication (Session and HttpBasic)  

      
      templates/django-ninja
      ├── auth.py
      ├── errors.py
      ├── models.py
      ├── schemas.py
      ├── tests
      │   ├── tests_auth.py
      │   ├── tests_errors.py
      │   └── tests_views.py
      ├── urls.py
      └── views.py

### Frontend (Angular)

## Initialisation

      python3 -m venv .env
      source .env/bin/activate
      pip install -r requirements.txt

## Usage
1. initialize a django project and app `django-admin startproject my-project` and `django-admin startapp my-app` and dont forget to add the `django-ninja` package
2. define an `ApplicationModel` and run it through the generator (see [main.py](/main.py))
3. run the generator `Generator().generate('/path/to/django/app', app_model)`
4. adapt the `urls.py` in the django project  

    ```python    
    from django.contrib import admin
    from django.urls import path
    from my_app import urls as my_app_urls

    urlpatterns = [
        path('admin/', admin.site.urls),
    ] + my_app_urls.urlpatterns
    ```
5. run the migrations commands `./manage.py makemigrations && ./manage.py migrate`
6. run the tests `./manage.py test`

### Extras
> If you want you chan check the test coverage using `coverage.py`
1. install `coverage` run `pip install coverage`
2. run the `coverage run --source='.' manage.py test`
3. generate the report `coverage report -m`

## TODO:
- [ ] windows compatible
- [ ] generate django Project an App similar to angular
- [ ] django ninja pagination and filtering
- [ ] frontend testing
- [ ] frontend autocomplete for relations
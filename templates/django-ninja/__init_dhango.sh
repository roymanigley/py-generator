# py-conf-meta-inf: {"execute": true}
rm -rf {{ helpers.to_snake_case(app.app_name) }}
django-admin startproject {{ helpers.to_snake_case(app.app_name) }}
cd {{ helpers.to_snake_case(app.app_name) }}
python3 -m venv .env
source .env/bin/activate
pip install django django-ninja
pip freeze > requirements.txt
./manage.py startapp {{  helpers.to_snake_case(app.app_name) }}_api
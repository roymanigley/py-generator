# py-conf-meta-inf: {"execute": true}
django-admin startproject {{ app.app_name }}
cd {{ app.app_name }}
python -m venv .env
source .env/bin/activate
pip install django django-ninja
pip freeze > requirements.txt
./manage.py startapp {{ app.app_name }}_api
# TODO: adapt settings.py
# TODO: adapt urls.py
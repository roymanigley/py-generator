# py-conf-meta-inf: {"execute": true}
cd ../
ng new {{ app.app_name }}_frontend --routing --style scss --skip-git
cd {{ app.app_name }}_frontend
ng g module shared
ng g module views/Login
ng g component views/Login
ng g module views/Logout
ng g component views/Logout
ng g module views/Home
ng g component views/Home
ng g module views/layout
ng g component views/layout/Header
ng g service services/account
ng g service services/CustomHttpInjector
ng g component views/NotFound
ng g guard shared/Authenticated --implements=CanActivate
ng g component shared/components/form-input-text --module shared
ng g component shared/components/form-input-textarea --module shared
ng g component shared/components/form-input-number --module shared
ng g component shared/components/form-input-date --module shared
ng g component shared/components/form-input-dropdown --module shared
ng g component shared/components/form-input-autocomplete --module shared
{% for model in domain_models %}
ng g class models/{{model.name}}
ng g module views/{{model.name}}
ng g component views/{{ helpers.to_kebab_case(model.name) }}/{{model.name}}List
ng g component views/{{ helpers.to_kebab_case(model.name) }}/{{model.name}}Detail
ng g component views/{{ helpers.to_kebab_case(model.name) }}/{{model.name}}Update
ng g component views/{{ helpers.to_kebab_case(model.name) }}/{{model.name}}Delete
ng g service services/{{ model.name }}
ng g resolver views/{{ helpers.to_kebab_case(model.name) }}/{{model.name}}
{% endfor %}

# TODO: windows compatible
cat angular.json | sed 's/\(build:development"\)/\1, "proxyConfig": "src\/proxy.conf.json"/g' > test.angular.json
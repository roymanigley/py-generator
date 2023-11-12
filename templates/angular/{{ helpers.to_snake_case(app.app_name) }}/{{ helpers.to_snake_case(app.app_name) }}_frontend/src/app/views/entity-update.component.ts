{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{ helpers.to_kebab_case(model.name) }}/{{ helpers.to_kebab_case(model.name) }}-update/{{ helpers.to_kebab_case(model.name) }}-update.component.ts"}
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { {{ model.name }}, {{ model.name }}Payload } from 'src/app/models/{{ helpers.to_kebab_case(model.name) }}';
import { map } from 'rxjs';
import { {{ model.name }}Service } from 'src/app/services/{{ helpers.to_kebab_case(model.name) }}.service';{% for relation in model.relations %}
import { {{ relation.data_type }}Service } from 'src/app/services/{{ helpers.to_kebab_case(relation.data_type) }}.service';
import { {{ relation.data_type }} } from 'src/app/models/{{ helpers.to_kebab_case(relation.data_type) }}';
{% endfor %}
// {enum_imports}
// {auto_complete_services_import}

@Component({
  selector: 'app-{{ helpers.to_kebab_case(model.name) }}-update',
  templateUrl: './{{ helpers.to_kebab_case(model.name) }}-update.component.html',
  styleUrls: ['./{{ helpers.to_kebab_case(model.name) }}-update.component.scss']
})
export class {{ model.name }}UpdateComponent implements OnInit {

  selected?: {{ model.name }}
  formGroup?: FormGroup;
  // {enum_list}
  // {auto_complete_lists}
  {% for relation in model.relations %}
  {{ relation.name }}SearchFunction = (search: string) => this.{{ relation.name }}Service.findAll(search)
    .pipe(
      map(response => response.body),
      map(body => body?.items ?? [])
    );

  {{ relation.name }}DisplayFunction = (record: {{ relation.data_type }}) => record.{{ relation.display_field }};
  {% endfor %}
  constructor(
    //{auto_complete_services}
    private service: {{ model.name }}Service,
    private location: Location,{% for relation in model.relations %}
    private {{ relation.name }}Service: {{ relation.data_type }}Service,
  {% endfor %}
    private route: ActivatedRoute
  ) {
    route.data.subscribe(data => {
      if (data['data']) {
        this.selected = data['data'];
      }
    });
  }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup(this.selected);
    setTimeout(() => {
      eval('M.updateTextFields(); M.AutoInit();');
    }, 0)

  }

  createFormGroup(record?: {{ model.name }}): FormGroup {
    return new FormGroup({
    {% for field in model.fields %}
    {{ field.name }}: new FormControl(record?.{{ field.name }} ?? undefined {% if field.required %},[Validators.required]{% endif %}),
    {% endfor %}{% for relation in model.relations %}
    {{ relation.name }}_id: new FormControl(record?.{{ relation.name }}?.id ?? undefined {% if relation.required %},[Validators.required]{% endif %}),
    {% endfor %}
    })
  }

  save(): void {
    const payload = this.formGroup?.value;
    if (this.selected?.id) {
      this.service.update(this.selected.id, payload)
        .subscribe(() => this.back());
    } else {
      this.service.create(payload)
        .subscribe(() => this.back());
    }
  }

  back(): void {
    this.location.back();
  }

  // {auto_complete_methods}
}
{% endfor %}
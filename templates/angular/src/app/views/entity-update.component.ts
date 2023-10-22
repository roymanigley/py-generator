{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{ helpers.to_kebab_case(model.name) }}/{{ helpers.to_kebab_case(model.name) }}-update/{{ helpers.to_kebab_case(model.name) }}-update.component.ts"}
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { {{ model.name }}, {{ model.name }}Payload } from 'src/app/models/{{ helpers.to_kebab_case(model.name) }}';
import { {{ model.name }}Service } from 'src/app/services/{{ helpers.to_kebab_case(model.name) }}.service';
import { map } from 'rxjs';
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

  constructor(
    //{auto_complete_services}
    private service: {{ model.name }}Service,
    private location: Location,
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
    return new FormGroup({ /*{create_form_group}*/    })
  }

  fromFormGroup(): {{ model.name }}Payload {
    const payload = {} as {{ model.name }}Payload;
    // {from_form_group}
    return payload;
  }

  save(): void {
    const payload = this.fromFormGroup();
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
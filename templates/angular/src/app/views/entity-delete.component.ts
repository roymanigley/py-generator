{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{ helpers.to_kebab_case(model.name) }}/{{ helpers.to_kebab_case(model.name) }}-delete/{{ helpers.to_kebab_case(model.name) }}-delete.component.ts"}
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { {{ model.name }} } from 'src/app/models/{{ helpers.to_kebab_case(model.name) }}';
import { {{ model.name }}Service } from 'src/app/services/{{ helpers.to_kebab_case(model.name) }}.service';

@Component({
  selector: 'app-{{ helpers.to_kebab_case(model.name) }}-delete',
  templateUrl: './{{ helpers.to_kebab_case(model.name) }}-delete.component.html',
  styleUrls: ['./{{ helpers.to_kebab_case(model.name) }}-delete.component.scss']
})
export class {{ model.name }}DeleteComponent implements OnInit {

  selected: {{ model.name }} = { } as {{ model.name }};

  constructor(
    private service: {{ model.name }}Service,
    private location: Location,
    private route: ActivatedRoute
  ) {
    route.data.subscribe(data => this.selected = data['data']);
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.service.delete(this.selected.id!)
      .subscribe(() => this.back())
  }

  back(): void {
    this.location.back();
  }
}
{% endfor %}
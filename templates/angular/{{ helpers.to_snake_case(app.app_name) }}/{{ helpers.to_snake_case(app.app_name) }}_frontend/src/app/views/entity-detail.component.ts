{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{ helpers.to_kebab_case(model.name) }}/{{helpers.to_kebab_case(model.name)}}-detail/{{ helpers.to_kebab_case(model.name) }}-detail.component.ts"}
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { {{ model.name }} } from 'src/app/models/{{ helpers.to_kebab_case(model.name) }}';

@Component({
  selector: 'app-{{ helpers.to_kebab_case(model.name) }}-detail',
  templateUrl: './{{ helpers.to_kebab_case(model.name) }}-detail.component.html',
  styleUrls: ['./{{ helpers.to_kebab_case(model.name) }}-detail.component.scss']
})
export class {{ model.name }}DetailComponent implements OnInit {

  selected: {{ model.name }} = { } as {{ model.name }};

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) {
    route.data.subscribe(data => this.selected = data['data']);
  }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }
}
{% endfor %}
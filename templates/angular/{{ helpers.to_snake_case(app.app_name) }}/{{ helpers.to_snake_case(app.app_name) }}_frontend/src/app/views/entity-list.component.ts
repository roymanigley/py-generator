{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{ helpers.to_kebab_case(model.name) }}/{{ helpers.to_kebab_case(model.name) }}-list/{{ helpers.to_kebab_case(model.name) }}-list.component.ts"}
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { {{ model.name }} } from 'src/app/models/{{ helpers.to_kebab_case(model.name) }}';
import { {{ model.name }}Service } from 'src/app/services/{{ helpers.to_kebab_case(model.name) }}.service';

@Component({
  selector: 'app-{{ helpers.to_kebab_case(model.name) }}-list',
  templateUrl: './{{ helpers.to_kebab_case(model.name) }}-list.component.html',
  styleUrls: ['./{{ helpers.to_kebab_case(model.name) }}-list.component.scss']
})
export class {{ model.name }}ListComponent implements OnInit {

  records: {{ model.name }}[] = []

  constructor(private service: {{ model.name }}Service) { }

  ngOnInit(): void {
    this.service.findAll()
    .pipe(
      map(response => response.body)
    ).subscribe({
      next: records => this.records = records?.items ?? []
    })
  }
}
{% endfor %}
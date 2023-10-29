{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{ helpers.to_kebab_case(model.name) }}.service.ts"}
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { {{ model.name }}, {{ model.name }}Payload } from '../models/{{ helpers.to_kebab_case(model.name) }}';

interface I{{ model.name }}ListWrapper {
  items: {{ model.name }}[]
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class {{ model.name }}Service {

  private readonly RESOURCE_PATH = '/api/{{ helpers.to_snake_case(model.name) }}'

  constructor(private http: HttpClient) { }

  findAll(search?: string, filters?: any, page: number=1, size=20): Observable<HttpResponse<I{{ model.name }}ListWrapper>> {
    if (search) {
        search = `&search=${search}`;
    } else {
        search = '';
    }
    return this.http.get<I{{ model.name }}ListWrapper>(`${this.RESOURCE_PATH}?$offset=${page - 1}&limit=${size}{search}`, {observe: 'response'});
  }

  findOne(id: number): Observable<HttpResponse<{{ model.name }}>> {
    return this.http.get<{{ model.name }}>(`${this.RESOURCE_PATH}/${id}`, {observe: 'response'});
  }

  create(payload: {{ model.name }}Payload): Observable<HttpResponse<{{ model.name }}>> {
    return this.http.post<{{ model.name }}>(`${this.RESOURCE_PATH}`, payload, {observe: 'response'});
  }

  update(id: number, payload: {{ model.name }}Payload): Observable<HttpResponse<{{ model.name }}>> {
    return this.http.put<{{ model.name }}>(`${this.RESOURCE_PATH}/${id}`, payload, {observe: 'response'});
  }

  update_partial(id: number, payload: {{ model.name }}Payload): Observable<HttpResponse<{{ model.name }}>> {
    return this.http.patch<any>(`${this.RESOURCE_PATH}/${id}`, payload, {observe: 'response'});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.RESOURCE_PATH}/${id}`);
  }
}
{% endfor %}
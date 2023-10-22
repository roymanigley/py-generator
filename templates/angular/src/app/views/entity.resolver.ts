{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{helpers.to_kebab_case(model.name)}}/{{helpers.to_kebab_case(model.name)}}.resolver.ts"}
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { EMPTY, Observable, mergeMap, of } from 'rxjs';
import { {{ model.name }} } from '../../models/{{helpers.to_kebab_case(model.name)}}';
import { {{ model.name }}Service } from '../../services/{{helpers.to_kebab_case(model.name)}}.service';

@Injectable({
  providedIn: 'root'
})
export class {{ model.name }}Resolver implements Resolve<{{ model.name }} | boolean> {

  constructor(
    private service: {{ model.name }}Service,
    private router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{{ model.name }} | boolean> {
    const id = route.params['id'];
    if (id) {
      return this.service.findOne(id)
        .pipe(
          mergeMap(response => {
            if (response?.body) {
              return of(response.body)
            } else {
              return this.router.navigate(['404']);
            }
          }
        )
      );
    }
    this.router.navigate(['404']);
    return EMPTY
  }
}
{% endfor %}
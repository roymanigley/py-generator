{% for model in domain_models %}# py-conf-meta-inf: {"file_name": "{{helpers.to_kebab_case(model.name)}}/{{helpers.to_kebab_case(model.name)}}.module.ts"}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { {{model.name}}ListComponent } from './{{ helpers.to_kebab_case(model.name) }}-list/{{ helpers.to_kebab_case(model.name) }}-list.component';
import { {{model.name}}DetailComponent } from './{{ helpers.to_kebab_case(model.name) }}-detail/{{ helpers.to_kebab_case(model.name) }}-detail.component';
import { {{model.name}}UpdateComponent } from './{{ helpers.to_kebab_case(model.name) }}-update/{{ helpers.to_kebab_case(model.name) }}-update.component';
import { {{model.name}}DeleteComponent } from './{{ helpers.to_kebab_case(model.name) }}-delete/{{ helpers.to_kebab_case(model.name) }}-delete.component';
import { AuthenticatedGuard } from 'src/app/shared/authenticated.guard';
import { {{ model.name }}Resolver } from './{{ helpers.to_kebab_case(model.name) }}.resolver';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: 'new', component: {{model.name}}UpdateComponent, canActivate: [AuthenticatedGuard] },
  { path: 'detail/:id', component: {{model.name}}DetailComponent, canActivate: [AuthenticatedGuard], resolve: { data: {{model.name}}Resolver} },
  { path: 'update/:id', component: {{model.name}}UpdateComponent, canActivate: [AuthenticatedGuard], resolve: { data: {{model.name}}Resolver} },
  { path: 'delete/:id', component: {{model.name}}DeleteComponent, canActivate: [AuthenticatedGuard], resolve: { data: {{model.name}}Resolver} },
  { path: '', component: {{model.name}}ListComponent, canActivate: [AuthenticatedGuard] }
];

@NgModule({
  declarations: [
    {{model.name}}ListComponent,
    {{model.name}}DetailComponent,
    {{model.name}}UpdateComponent,
    {{model.name}}DeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class {{model.name}}Module { }
{% endfor %}

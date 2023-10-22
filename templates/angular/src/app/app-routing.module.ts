import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },{% for model in domain_models %}
  { path: '{{helpers.to_kebab_case(model.name)}}', loadChildren: () => import('./views/{{helpers.to_kebab_case(model.name)}}/{{helpers.to_kebab_case(model.name)}}.module').then(m => m.{{model.name}}Module) },{% endfor %}
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

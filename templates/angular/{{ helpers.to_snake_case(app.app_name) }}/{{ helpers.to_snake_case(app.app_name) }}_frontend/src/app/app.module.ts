import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticatedGuard } from './shared/authenticated.guard';
import { CustomHttpInjectorService } from './services/custom-http-injector.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthenticatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInjectorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

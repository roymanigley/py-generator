import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpInjectorService implements HttpInterceptor {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      const clonedRequest = req.clone(
        { setHeaders: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      return next.handle(clonedRequest)
        .pipe(
          tap({ next: () => {},
            error:  error => {
              if (error.status === 401) {
                this.accountService.logout()
                this.router.navigate(['login'])
              } else if (error.status === 404) {
                this.router.navigate(['404'])
              }
            }
          })
        );
    } else {
      return next.handle(req);
    }
  }
}
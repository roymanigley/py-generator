import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account?: IAccount;

  constructor(
    private http: HttpClient
  ) { }

  getAccount(): Observable<IAccount> {
    if (this.account) {
      return of(this.account);
    } else {
      return this.http.get<IAccount>('/api/account').pipe(
        tap(response => this.account = response),
        map(() => this.account!)
      )
    }
  }

  logout(): void {
    this.account = undefined;
    this.http.get('/admin/logout/').subscribe();
  }
}

interface IAccount {
  username: string
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Buffer } from "buffer";
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account?: IAccount;

  constructor(
    private http: HttpClient
  ) { }

  init(): void {
    const account = localStorage.getItem('account');
    const token = localStorage.getItem('token');
    if (account && token) {
      this.account = JSON.parse(account);
    } else {
      this.logout();
    }
  }

  login(login: string, password: string): Observable<IAccount> {
    return this.http.post<IToken>(`/api/login?username=${login}&password=${password}`, undefined)
      .pipe(
        map(response => this.handleTokenResponse(response.token))
      )
  }

  logout(): void {
    this.account = undefined;
    localStorage.removeItem('account')
    localStorage.removeItem('token')
  }

  private handleTokenResponse(token: string): IAccount {
    const tokenDecoded = this.decodeB64(
      token.replace(/\..+/g, '')
    );
    this.account = {
      username: JSON.parse(tokenDecoded).username
    } as IAccount
    localStorage.setItem('account', JSON.stringify(this.account))
    localStorage.setItem('token', JSON.stringify(token))
    return this.account;
  }

  private decodeB64(str: string): string {
    return Buffer.from(str, 'base64').toString('binary');
  }
}

interface IToken {
  token: string
}

interface IAccount {
  username: string
}
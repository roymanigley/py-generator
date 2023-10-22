import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required ),
  });
  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const login = this.loginForm.value.login
    const password = this.loginForm.value.password
    if (login && password) {
      this.accountService.login(
        login,
        password
      )
      .subscribe({
        next: account => {
          console.log(`logged in as: ${account.username}`);
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error(`${error.status}: ${error.statusText}`, error.error);
          this.loginForm.get('password')?.reset();
        }
      })
    }
  }
}
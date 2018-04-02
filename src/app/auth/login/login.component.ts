import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="centered">
        <app-auth-form (submitted)="loginUser($event)">
          <h1 class="form-title">Login</h1>
          <a
            class="text-link"
            routerLink="/auth/signup">
          Not registered?
          </a>
          <button
            type="submit"
            class="button uber button-fluid">
            Login
          </button>
          </app-auth-form>
    </div>
  `
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginUser(event: FormGroup) {
    console.log(event.value);
  }
}

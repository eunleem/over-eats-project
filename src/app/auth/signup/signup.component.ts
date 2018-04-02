import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  template: `
    <div class="centered">
        <app-auth-form (submitted)="signupUser($event)">
          <h1 class="form-title">Signup</h1>
          <a routerLink="/auth/login">
          Already a member?
          </a>
          <button
            type="submit"
            class="button uber button-fluid">
            Create account
          </button>
          </app-auth-form>
    </div>
  `
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signupUser(event: FormGroup) {
    console.log(event.value);
  }
}

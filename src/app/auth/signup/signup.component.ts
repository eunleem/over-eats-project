import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';

@Component({
  selector: 'app-signup',
  template: `
    <div class="centered signup">
        <app-auth-form
          [error]="error"
          (submitted)="signupUser($event)">
          <h1 class="form-title">회원가입</h1>
          <p class="form-sub">이메일 계정으로 간편하게 오버잇츠 회원이 되세요!</p>
          <span>이미 회원이신가요?</span>
          <a
            class="text-link"
            routerLink="/auth/login">
          로그인
          </a>
          <button
            type="submit"
            class="button uber button-fluid">
            회원가입하기
          </button>
          </app-auth-form>
    </div>
  `
})
export class SignupComponent implements OnInit {
  error: boolean;

  @ViewChild(AuthFormComponent) authformComponent: AuthFormComponent;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toggle();
  }


  signupUser(event: FormGroup) {
    const newUser = Object.assign(
      {}, event.value, {first_name: event.value.firstName, last_name: event.value.lastName, phone_number: event.value.phoneNumber});
    this.auth.signup(newUser)
      .subscribe(
        () => {
          console.log('sign up');
          this.auth.signin(event.value)
            .subscribe(() => this.router.navigate(['user']));
        },
        ({ error }) => this.error = true
      );
  }
  toggle() {
    this.authformComponent.isshow = true;
  }
}

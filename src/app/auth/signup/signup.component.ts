import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  template: `
    <div class="centered signup">
        <app-auth-form (submitted)="signupUser($event)">
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

  constructor() { }

  ngOnInit() {
  }

  signupUser(event: FormGroup) {
    console.log(event.value);
  }
}

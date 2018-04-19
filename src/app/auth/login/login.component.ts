import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="centered">
        <app-auth-form (submitted)="loginUser($event)">
          <h1 class="form-title">로그인하기</h1>
          <p class="form-sub">이메일 계정으로
간편하게 오버잇츠를 만나보세요!</p>
          <span>아직 회원이 아닌가요?</span>
          <a
            class="text-link"
            routerLink="/signup">
          회원가입
          </a>
          <button
            type="submit"
            class="button uber button-fluid">
            로그인하기
          </button>
          </app-auth-form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }


  loginUser(event: FormGroup) {
    this.auth.signin(event.value)
      .subscribe(
        () => {
          console.log(this.auth.isAuthenticated());
          this.router.navigate(['home']);
        },
        ({ error }) => this.message = error.message
      );
  }

}

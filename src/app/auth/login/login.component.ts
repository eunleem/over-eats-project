import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  template: `
    <div class="centered">
        <app-auth-form
          [error]="loginError"
          (submitted)="loginUser($event)" #authForm>
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
            [disabled]="!authForm.f.valid"
            [class.disabled]="!authForm.f.valid"
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
  loginError: boolean;


  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }


  loginUser(event: FormGroup) {
    const user = {
      username: event.value.username,
      password: event.value.password
    };
    this.auth.signin(user)
      .subscribe(
        () => {
          console.log(this.auth.isAuthenticated());
          this.router.navigate(['home']);
        },
        ( {error} ) => {
          console.log('error', error);
          this.loginError = true;
        }
      );
  }

}

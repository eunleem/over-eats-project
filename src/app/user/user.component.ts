import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/user';
import { environment } from '../../environments/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: `
  <form [formGroup]="userform" (ngSubmit)="saveUser()" novalidate>
    <div class="constraint user-container">
      <div class="user-picture">
        <p><img [src]="user?.img_profile"></p>
      </div>
      <div class="user-info">
        <p> 기본 정보 </p>

        <div class="user-name user"> 유저 이름
          <input type="text"
          value={{user?.username}}
          formControlName="username">
          <span class="error" *ngIf="usernameFormat">
            이메일을 입력해 주세요.
          </span>
          <span class="error" *ngIf="usernamePattern">
            이메일 형식에 맞게 입력해 주세요.
          </span>
        </div>

        <div class="user"> 이메일 :
          <input type="text"
          value={{user?.email}}
          formControlName="email">
          <span class="error" *ngIf="usernameFormat">
            이메일을 입력해 주세요.
          </span>
          <span class="error" *ngIf="usernamePattern">
            이메일 형식에 맞게 입력해 주세요.
          </span>
        </div>

        <div class="name user">
          <div class="last-name"> 성
            <input type="text"
            value={{user?.last_name}}
            formControlName="lastName">
            <span class="error" *ngIf="lastNameInvalid">
              성을 입력해 주세요.
            </span>
          </div>

          <div class="first-name"> 이름
            <input type="text"
            value={{user.first_name}}
            formControlName="firstName">
            <span class="error" *ngIf="firstNameInvalid">
              이름을 입력해 주세요.
            </span>
          </div>
        </div>

        <div class="phone-number user">휴대전화 번호
          <input type="text"
            value={{user?.phone_number}}
            formControlName="phoneNumber">
            <span class="error" *ngIf="phoneNumberInvalid">
            전화번호를 입력해 주세요.
          </span>
        </div>

      </div>
    </div>
    <div class="save">
      <button type="submit"> 저장하기 </button>
    </div>
  </form>
  <pre>{{ userform.value | json}}</pre>
  `
})
export class UserComponent implements OnInit {
  user: any;
  userform: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    console.log('who is user?', this.user);
    this.userform = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      firstName: ['', [Validators.required,
      Validators.pattern(/[a-zA-z]/),
      ]],
      lastName: ['', [Validators.required,
      Validators.pattern(/[a-zA-z]/),
      ]],
      phoneNumber: ['', [Validators.required,
      Validators.pattern(/[0-9]/),
      Validators.minLength(10),
      Validators.maxLength(12)
      ]]
    });
  }

  saveUser() {
    console.log('event', this.userform);
  }

  // getUser() {
  //   const user = JSON.parse(localStorage.getItem(this.USER));
  //   const token = localStorage.getItem(this.TOKEN_NAME);
  //   console.log(user.pk, token);
  //   return this.http.get(`${this.URL}/member/user/${user.pk}`);
  // }

  get usernameFormat() {
    const control = this.userform.get('username');
    return control.hasError('required') && control.touched;
  }
  get usernamePattern() {
    const control = this.userform.get('username');
    return control.hasError('pattern') && control.touched;
  }
  get useremailFormat() {
    const control = this.userform.get('email');
    return control.hasError('required') && control.touched;
  }
  get useremailPattern() {
    const control = this.userform.get('email');
    return control.hasError('pattern') && control.touched;
  }

  get firstNameInvalid() {
    const control = this.userform.get('firstName');
    return control.hasError('pattern') && control.touched;
  }

  get lastNameInvalid() {
    const control = this.userform.get('lastName');
    return control.hasError('pattern') && control.touched;
  }

  get phoneNumberInvalid() {
    const control = this.userform.get('phoneNumber');
    return control.hasError('pattern') && control.touched;
  }

}

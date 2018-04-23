import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/user';
import { environment } from '../../environments/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: `
  <div class="constraint">
  <form [formGroup]="userform" (ngSubmit)="saveUser()" novalidate *ngIf="user">
    <div class="user-container">
      <div class="user-picture">
        <p><img [src]="user.img_profile"></p>
      </div>
      <div class="user-info">
        <p> 기본 정보 </p>
        <div class="user-name user"> 유저 이름
          <input type="text"
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
            formControlName="last_name">
            <span class="error" *ngIf="lastNameInvalid">
              성을 입력해 주세요.
            </span>
          </div>
          <div class="first-name"> 이름
            <input type="text"
            formControlName="first_name">
            <span class="error" *ngIf="firstNameInvalid">
              이름을 입력해 주세요.
            </span>
          </div>
        </div>
        <div class="phone-number user">휴대전화 번호
          <input type="text"
            formControlName="phone_number">
            <span class="error" *ngIf="phoneNumberInvalid">
            전화번호를 입력해 주세요.
          </span>
        </div>

      </div>
    </div>
    <div class="save">
      <button type="submit"> 저장하기 </button>
    </div>
    <pre>{{ this.userform.value | json}}</pre>
    </form>
  </div>
  `
})
export class UserComponent implements OnInit {
  // ------ TODO ----
  // user내용 변경되었을때반 저장 버튼 활성화
  // validator 정확하게 처리
  // 이메일 유저네임 동일한건지 개별적인건지 확인 하고 변경할 수 있게 할건지 결정할것

  user: any;
  userform: FormGroup;
  pk: number;
  token: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateRoute
      .params.subscribe(params => {
        this.pk = params.pk;
        this.token = this.auth.getToken();
        this.auth.getUserFromServer(this.token, this.pk)
          .subscribe(data => {
            this.user = data;
            this.makeForm();
          });
    });
  }

  makeForm() {
    this.userform = this.fb.group({
      username: [this.user.username, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      email: [this.user.username, [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      first_name: [this.user.first_name, [
        Validators.required,
        Validators.pattern(/[a-zA-z]/),
      ]],
      last_name: [this.user.last_name, [
        Validators.required,
        Validators.pattern(/[a-zA-z]/),
      ]],
      phone_number: [this.user.phone_number, [
        Validators.required,
        Validators.pattern(/[0-9]/),
        Validators.minLength(10),
        Validators.maxLength(12)
      ]]
    });
  }
  saveUser() {
    // this.auth.updateUser(this.userform.value, this.pk, this.token)
    //   .subscribe(data => console.log('update user', data));
    console.log(this.userform.value);
  }

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
    const control = this.userform.get('first_name');
    return control.hasError('pattern') && control.touched;
  }

  get lastNameInvalid() {
    const control = this.userform.get('last_name');
    return control.hasError('pattern') && control.touched;
  }

  get phoneNumberInvalid() {
    const control = this.userform.get('phone_number');
    return control.hasError('pattern') && control.touched;
  }

}

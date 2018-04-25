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
    <div class="user-container constraint">
      <div class="user-picture">
        <img [src]="user.img_profile">
      </div>
      <div class="user-info">
        <p> 기본 정보 </p>
        <div class="user-name user"> 유저 이름
          <input type="text"
          formControlName="username" disabled>
        </div>
        <div class="user-password user"> 비밀 번호
          <input type="text"
          formControlName="password">
          <ng-container *ngIf="password.invalid && (password.dirty || password.touched)">
          <span class="error" *ngIf="password.errors.required">
            비밀번호를 입력해주세요.
          </span>
          </ng-container>
        </div>
        <div class="name user">
          <div class="last-name"> 성
            <input type="text"
            formControlName="last_name">
            <ng-container *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)">
              <span class="error" *ngIf="lastName.errors.required">
                성을 입력해 주세요.
              </span>
              <span class="error" *ngIf="lastName.errors.pattern">
                영문을 입력해주세요.
              </span>
            </ng-container>
          </div>
          <div class="first-name"> 이름
            <input type="text"
            formControlName="first_name">
            <ng-container *ngIf="firstName.invalid && (firstName.touched || firstName.dirty)">
              <span class="error" *ngIf="firstName.errors.required">
                이름을 입력해 주세요.
              </span>
              <span class="error" *ngIf="firstName.errors.pattern">
                영문을 입력해 주세요.
              </span>
            </ng-container>
          </div>
        </div>
        <div class="phone-number user">휴대전화 번호
          <input type="text"
            formControlName="phone_number">
          <ng-container *ngIf="phoneNumber.invalid && (phoneNumber.touched || phoneNumber.dirty)">
            <span class="error" *ngIf="phoneNumber.errors.required">
              전화번호를 입력해 주세요.
            </span>
            <span class="error" *ngIf="phoneNumber.errors.pattern">
              숫자를 입력하세요.
            </span>
          </ng-container>
        </div>
      </div>
    </div>
    <div class="save" *ngIf="this.userform.dirty">
      <button type="submit"> 저장하기 </button>
    </div>
    </form>
  </div>
  `
})
export class UserComponent implements OnInit {

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
      username: [this.user.username, {disabled: true}],
      email: [this.user.email, {disabled: true}],
      password: ['', [
      Validators.required,
      Validators.pattern(/[a-zA-Z0-9]/),
      Validators.minLength(5),
      Validators.maxLength(10)
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
    this.auth.updateUser(this.userform.value, this.pk, this.token)
      .subscribe(data => console.log('update user', data));
    console.log(this.userform.value);
  }

  get password() {
    return this.userform.get('password');
  }
  get firstName() {
    return this.userform.get('first_name');
  }

  get lastName() {
    return this.userform.get('last_name');
  }

  get phoneNumber() {
    return this.userform.get('phone_number');
  }

}

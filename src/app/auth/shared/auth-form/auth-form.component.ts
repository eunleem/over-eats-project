import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form #f="ngForm" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <ng-content select="h1"></ng-content>
      <ng-content select="p"></ng-content>
      <div class="form-group">
        <label>
          <input
            class="uber"
            type="username"
            placeholder="이메일주소"
            autocomplete="email"
            formControlName="username">
        </label>
        <ng-container *ngIf="username.invalid && (username.dirty || username.touched)">
          <span class="error" *ngIf="username.errors.required">
            이메일을 입력해 주세요.
          </span>
          <span class="error" *ngIf="username.errors.pattern">
            이메일 형식에 맞게 입력해 주세요.
          </span>
          </ng-container>
          <span class="error" *ngIf="error == true">
            정보가 틀렸습니다.
          </span>
      </div>
      <div class="form-group">
        <label>
          <input
            class="uber"
            type="password"
            placeholder="비밀번호 입력"
            formControlName="password">
        </label>
        <ng-container *ngIf="password.invalid && (password.dirty || password.touched)">
          <span class="error" *ngIf="password.errors.required">
            비밀번호를 입력해 주세요.
          </span>
          <span class="error" *ngIf="password.errors.minlength">
            비밀번호는 최소 5자 이상입니다.
          </span>
          <span class="error" *ngIf="password.errors.pattern">
            영문과 숫자를 조합해서 입력하세요.
          </span>
        </ng-container>
      </div>

      <div *ngIf="isSignup">
        <div class="name">
          <div class="last-name form-group">
            <label>
            <input
              class="uber"
              type="text"
              placeholder="Kim"
              formControlName="last_name">
            </label>
            <ng-container *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)">
            <span class="error" *ngIf="lastName.errors.required">
              이름을 입력해 주세요.
            </span>
            <span class="error" *ngIf="lastName.errors.pattern">
              이름은 영문만 가능합니다.
            </span>
          </ng-container>
          </div>
          <div class="first-name form-group">
            <label>
            <input
              class="uber"
              type="text"
              placeholder="Yuna"
              formControlName="first_name">
            </label>
          <ng-container *ngIf="firstName.invalid && (firstName.dirty || firstName.touched)">
            <span class="error" *ngIf="firstName.errors.required">
              이름을 입력해 주세요.
            </span>
            <span class="error" *ngIf="firstName.errors.pattern">
              이름은 영문만 가능합니다.
            </span>
          </ng-container>
          </div>
        </div>
        <div class="form-group">
          <label>
            <input
              class="uber"
              type="text"
              placeholder="전화번호"
              formControlName="phone_number">
          </label>
          <ng-container *ngIf="phoneNum.invalid && (phoneNum.dirty || phoneNum.touched)">
            <span class="error" *ngIf="phoneNum.errors.required">
              전화번호를 입력해 주세요.
            </span>
            <span class="error" *ngIf="phoneNum.errors.pattern">
              전화번호는 숫자만 가능합니다.
            </span>
          </ng-container>
        </div>
      </div>
      <div class="auth-form-action">
        <ng-content
          select="button"></ng-content>
      </div>
      <div class="auth-form-toggle">
        <ng-content select="span"></ng-content>
        <ng-content select="a"></ng-content>
      </div>
      </form>
    </div>
  `
})
export class AuthFormComponent implements OnInit {
  form: FormGroup;
  formValid: boolean;
  usernameExist: boolean;
  isshow = false;

  @Input()
  error: boolean;

  @Input()
  isSignup: boolean;

  @Output()
  submitted = new EventEmitter<FormGroup>();

  @ViewChild('f') f: NgForm;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.isSignup) {
      this.form = this.fb.group({
        username: ['', [
          Validators.required,
          Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
        ]],
        password: ['', [Validators.required,
          Validators.pattern(/[a-zA-Z0-9]/),
          Validators.minLength(5),
          Validators.maxLength(10)
        ]],
        first_name: ['', [Validators.required, Validators.pattern(/[a-zA-z]/)]],
        last_name: ['', [Validators.required, Validators.pattern(/[a-zA-z]/)]],
        phone_number: ['', [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.minLength(10),
          Validators.maxLength(12)
        ]]
      });
    } else {
      this.form = this.fb.group({
        username: ['', [
          Validators.required,
          Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
        ]],
        password: ['', [Validators.required,
        Validators.pattern(/[a-zA-Z0-9]/),
        Validators.minLength(5),
        Validators.maxLength(10)
        ]],
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.submitted.emit(this.form);
    }
  }

  get password() { return this.form.get('password'); }
  get username() { return this.form.get('username'); }
  get firstName() { return this.form.get('first_name'); }
  get lastName() { return this.form.get('last_name'); }
  get phoneNum() { return this.form.get('phone_number'); }

}

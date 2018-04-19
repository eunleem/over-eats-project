import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
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
        <span class="error" *ngIf="usernameFormat">
          이메일을 입력해 주세요.
        </span>
        <span class="error" *ngIf="usernamePattern">
          이메일 형식에 맞게 입력해 주세요.
        </span>
        <span class="error" *ngIf="error">
          이미 가입된 이메일주소 입니다.
        </span>
      </div>

      <div class="form-group">
        <label>
          <input
            class="uber"
            type="password"
            placeholder="비밀번호 입력"
            autocomplete="on"
            formControlName="password">
        </label>
        <span class="error" *ngIf="passwordInvalid">
          비밀번호를 입력해 주세요.
        </span>
      </div>

      <div *ngIf="isshow" class="form-group">
        <div class="name">
          <div class="last-name">
            <label>
            <input
              class="uber"
              type="text"
              placeholder="last name"
              formControlName="lastName">
            </label>
            <span class="error" *ngIf="firstNameInvalid">
              성을 입력해 주세요.
            </span>
          </div>
          <div class="first-name">
            <label>
            <input
              class="uber"
              type="text"
              placeholder="first name"
              formControlName="firstName">
            </label>
            <span class="error" *ngIf="lastNameInvalid">
              이름을 입력해 주세요.
            </span>
          </div>
        </div>

        <div class="form-group">
          <label>
            <input
              class="uber"
              type="text"
              placeholder="전화번호"
              formControlName="phoneNumber">
          </label>
          <span class="error" *ngIf="phoneNumberInvalid">
            전화번호를 입력해 주세요.
          </span>
        </div>
      </div>

      <ng-content select=".error"></ng-content>

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

  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

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
      firstName: ['', [ Validators.required,
        Validators.pattern(/[a-zA-z]/),
      ]],
      lastName: ['', [ Validators.required,
        Validators.pattern(/[a-zA-z]/),
      ]],
      phoneNumber: ['', [ Validators.required,
        Validators.pattern(/[0-9]/),
        Validators.minLength(10),
        Validators.maxLength(12)
      ]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
    console.log(typeof this.form.valid, this.form.valid);
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get usernameFormat() {
    const control = this.form.get('username');
    return control.hasError('required') && control.touched;
  }
  get usernamePattern() {
    const control = this.form.get('username');
    return control.hasError('pattern') && control.touched;
  }

  get firstNameInvalid() {
    const control = this.form.get('firstName');
    return control.hasError('pattern') && control.touched;
  }

  get lastNameInvalid() {
    const control = this.form.get('lastName');
    return control.hasError('pattern') && control.touched;
  }

  get phoneNumberInvalid() {
    const control = this.form.get('phoneNumber');
    return control.hasError('pattern') && control.touched;
  }
}

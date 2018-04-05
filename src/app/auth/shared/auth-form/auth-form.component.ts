import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
            type="userid"
            placeholder="이메일주소"
            formControlName="userid">
        </label>
          <span class="error" *ngIf="useridFormat">
            이메일을 입력해 주세요.
          </span>
          <span class="error" *ngIf="useridPattern">
            이메일 형식에 맞게 입력해 주세요.
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
        <span class="error" *ngIf="passwordInvalid">
          비밀번호를 입력해 주세요.
        </span>
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

  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userid: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      password: ['', [Validators.required,
        Validators.pattern(/[a-zA-Z0-9]/),
        Validators.minLength(4),
        Validators.maxLength(10)
      ]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get useridFormat() {
    const control = this.form.get('userid');
    return control.hasError('required') && control.touched;
  }
  get useridPattern() {
    const control = this.form.get('userid');
    return control.hasError('pattern') && control.touched;
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

      <ng-content select="h1"></ng-content>
      <div class="form-group">
        <label>
          <input
            class="uber"
            type="email"
            placeholder="Email address"
            formControlName="email">
        </label>
          <span class="error" *ngIf="emailFormat">
            Invalid email format
          </span>
        </div>
        <div class="form-group">
        <label>
          <input
            class="uber"
            type="password"
            placeholder="Enter password"
            formControlName="password">
        </label>
        <span class="error" *ngIf="passwordInvalid">
          Password is required
        </span>
        </div>
        <ng-content select=".error"></ng-content>

        <div class="auth-form-action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form-toggle">
          <ng-content select="a"></ng-content>
        </div>

      </form>
    </div>
  `
})
export class AuthFormComponent implements OnInit {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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

  get emailFormat() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }
}

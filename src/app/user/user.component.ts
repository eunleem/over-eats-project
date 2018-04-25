import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/user';
import { environment } from '../../environments/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  user: any;
  userform: FormGroup;
  pk: number;
  token: string;
  mask = [/[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

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
        Validators.minLength(12)
      ]]
    });
  }
  saveUser() {
    this.userform.value.phone_number = this.userform.value.phone_number.replace(/ +/g, '');
    if (this.userform.valid) {
      this.auth.updateUser(this.userform.value, this.pk, this.token)
        .subscribe(data => console.log('update user', data));
    }
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

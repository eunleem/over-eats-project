import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/user';
import { environment } from '../../environments/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: ''
})
export class UserComponent implements OnInit {
  user: any;
  token: string;
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.token = this.auth.getToken();
    this.auth.getUserFromServer(this.token, this.user.pk)
      .subscribe( data => console.log('user', data));
  }

}

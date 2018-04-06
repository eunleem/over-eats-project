import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: `
    <div>hello users</div>
  `
})
export class UserComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    console.log('who is user?', this.user);
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: `
    <div class="constraint">
      <div>hello users</div>
      <h2>{{ user?.username }}</h2>
      <p>{{ user?.first_name}}</p>
      <p>{{ user?.last_name}}</p>
      <p><img [src]="user?.img_profile"></p>
    </div>
  `
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

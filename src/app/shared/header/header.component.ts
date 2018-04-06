import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  onMenu = false;
  isCart = true;
  isLoggedIn: boolean;
  cartItem: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private cartService: CartService
  ) {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationStart) {
        if (data.url === '/home' || data.url === '') {
          this.onMenu = false;
        } else {
          this.onMenu = true;
        }
      }
    });
  }

  ngOnInit() {
    // console.log(this.route.snapshot.params.id);
  }

  signout() {
    this.auth.signout();
    this.router.navigate(['home']);
    console.log('successfully logged out', this.auth.isAuthenticated());
  }
}

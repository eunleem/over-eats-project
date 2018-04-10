import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../../core/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../models/shopping-cart.model';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  onMenu = false;
  isCart = true;
  isLoggedIn: boolean;
  thisUrl: string;

  cart: Observable<ShoppingCart>;
  itemCount: number;
  cartSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private cartService: CartService
  ) {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.thisUrl = data.urlAfterRedirects;
      }
    });
  }

  ngOnInit() {
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe(cart => {
      this.itemCount = cart.items.map(i => i.quantity).reduce((prev, current) => prev + current, 0);
    });
  }

  signout() {
    this.auth.signout();
    this.router.navigate(['home']);
    console.log('successfully logged out', this.auth.isAuthenticated());
  }
}

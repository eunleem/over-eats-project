import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../core/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  onMain = true;
  constructor(
    // private cartService: CartService
  ) { }

  ngOnInit() {
    // this.cartService.emptyCart();
  }

  ngOnDestroy() {
  }
}

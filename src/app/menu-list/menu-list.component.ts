import { Component, OnInit } from '@angular/core';

import { MenuData } from './menu.data';
import { Menu } from '../models/menu.interface';
import { Cart } from '../models/cart.interface';

import { CartService } from '../core/cart.service';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  items: any[];
  thisItem: any[];
  cart: Cart[];
  onClick = false;

  constructor(
    private cartService: CartService
  ) { }
  ngOnInit() {
    this.items = new MenuData().items;
  }

  showSelector(item) {
    this.onClick = true;
    this.thisItem = item;
  }
 
  // addCart(cartItem) {
  //   console.log('added to Cart database');
  //   this.cartService.addToCart(cartItem);
  // }

  onEdit(item) {
    this.onClick = true;
    this.thisItem = item;
  }
}

import { Component, OnInit } from '@angular/core';

import { MenuData } from './menu.data';
import { Menu } from '../models/menu.interface';
import { Cart } from '../models/cart.interface';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  items: any[];
  thisItem: Menu[];
  cart: Cart[];
  onClick = false;

  constructor() { }
  ngOnInit() {
    this.items = new MenuData().items;
  }
  showSelector(item) {
    this.onClick = true;
    this.thisItem = item;
  }
  addToCart(data) {
    this.cart = data;
    console.log(data);
  }
}

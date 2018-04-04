import { Component, OnInit } from '@angular/core';

import { CartComponent } from './cart/cart.component';

import { MenuData } from './menu.data';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  items: any[];

  constructor() { }
  ngOnInit() {
    this.items = new MenuData().items;
  }

}

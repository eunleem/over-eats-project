import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/product.interface';

import { CartService } from '../core/cart.service';
import { ProductsService } from '../core/products.service';
import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  products: Product[];
  selectedItem: Product[];
  onClick = false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productsService.getProducts()
      .subscribe((data: Product[]) => this.products = data);
  }

  clickItem(item) {
    this.onClick = true;
    this.selectedItem = item;
  }

}

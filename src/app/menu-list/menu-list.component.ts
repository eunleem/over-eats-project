import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/product.interface';

import { CartService } from '../core/cart.service';
import { EventEmitter } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../core/search.service';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  products: any[];
  categories: string[];

  onClick = false;
  selectedRestaurant: any;


  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let uuid: any;
    this.activateRoute
      .params.subscribe(params => {
        uuid = params.id;
        this.searchService.getProducts(uuid)
          .subscribe((data: any) => {
            this.products = data;
            this.categories = data.map(item => item.title);
          });
        });
  }

  clickItem(item: Product) {
    this.onClick = true;
    this.cartService.selectedProduct = item;
  }

}

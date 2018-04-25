import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/product.interface';

import { CartService } from '../core/cart.service';
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
  restaurantInfo;
  onClick = false;
  restaurantID: string;
  today = new Date().getDay();

  set selectedProduct(item) {
    this.cartService.selectedProduct = item;
  }

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private activateRoute: ActivatedRoute,
    private el: ElementRef,
  ) { }


  ngOnInit() {
    this.activateRoute
      .params.subscribe(params => {
        this.restaurantID = params.id;
          this.searchService.getRestaurant(params.id)
            .subscribe(data => {
              this.restaurantInfo = data;
              console.log(this.restaurantInfo);
            });
        this.searchService.getProducts(params.id)
          .subscribe((data: any) => {
            this.products = data;
            this.categories = data.map(item => item.title);
          });
        });
  }

  getOpenHour(arr) {
    if (this.today > 5) { this.today = 0; }
    const time = arr.map(item => item.end_time)[this.today];
    const hour = Math.floor(time / 60);
    const min = Math.floor(time % 60);
    return `${hour} : ${min === 0 ? '00' : min}`;
  }

  clickItem(item: Product) {
    this.onClick = true;
    this.selectedProduct = item;
  }


}

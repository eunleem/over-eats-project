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

  get selectedRes() {
    return this.cartService.selectedRestaurant;
  }

  set selectedRes(res) {
    this.cartService.selectedRestaurant = res;
  }

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
              this.selectedRes = data;
              console.log('restaurant info', this.restaurantInfo);
            });
        this.searchService.getProducts(params.id)
          .subscribe((data: any) => {
            this.products = data;
            this.categories = data.map(item => item.title);
            console.log(data);
          });
        });
  }

  clickItem(item: Product) {
    this.onClick = true;
    this.selectedProduct = item;
  }


}

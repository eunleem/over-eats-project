import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { CartService } from '../core/cart.service';

import { Product } from '../models/product.interface';
import { CartItem } from '../models/cart-item.model';
import { ShoppingCart } from '../models/shopping-cart.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface ICartItemWithProduct extends CartItem {
  totalCost: number;
}

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  template: `
  <app-selector
    *ngIf="onClick"
    [editItem]="cartItem"
    (close)="onClick = false">
  </app-selector>
  <div class="cart">
    <div class="button-group" *ngIf="!isCheckout else checkOut">
      <button
      (click)="goCheckout()"
      [disabled]="cartItems?.length == 0"
      [class.disabled]="cartItems?.length == 0"
      class="button uber button-fluid">장바구니 확인</button>
    </div>
    <ng-template #checkOut>
        <ng-content select=".button-group"></ng-content>
    </ng-template>
    <ul class="item-group">
        <li class="item-list"
          *ngFor="let item of cartItems">
            <div (click)="onEdit(item)">
              {{ item.product.title | korean }}
            </div>
            <span>{{ item.quantity }}</span>
            <span>{{ item.totalCost }}</span>
            <span
              type="button"
              (click)="onRemove(item.product.uuid)">
            <i class="far fa-trash-alt"></i>
            </span>
        </li>
    </ul>
    <div class="price-group">
      <p *ngIf="itemCount">
        <span>총 {{ itemCount }} 개 아이템</span>
        <span>{{ getTotal() | currency:'KRW' : 'symbol' : '1.0'}}</span>
      </p>
      <p *ngIf="!itemCount || itemCount == 0">
        카트에 아이템을 추가하면 여기에 나타납니다.</p>
    </div>
  </div>
  `
})
export class CartComponent implements OnInit {
  onClick: boolean;
  itemCount: number;
  cartItem: ICartItemWithProduct;
  cartItems: ICartItemWithProduct[];
  cart: Observable<ShoppingCart>;
  cartSubscription: Subscription;

  @Input() isCheckout = false;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cart = this.cartService.get();
    this.cart
      .subscribe(cart => {
      this.itemCount = cart.items.map(i => i.quantity).reduce((prev, current) => prev + current, 0);
      this.cartItems = cart.items.map((item) => {
        return {
          ...item,
          totalCost: item.product.price * item.quantity
        };
      });
    });
  }

  onSubmit() {
  }

  getTotal() {
    return this.cartItems.map(i => i.totalCost).reduce((prev, current) => prev + current, 0);
  }

  onRemove(id) {
    this.cartService.removeItem(id);
  }

  onEdit(item) {
    this.cartItem = item;
    this.onClick = true;
  }

  goCheckout() {
    this.router.navigate(['checkout']);
  }

  // ngOnDestroy() {
  //   if (this.cartSubscription) {
  //     this.cartSubscription.unsubscribe();
  //   }
  // }
}

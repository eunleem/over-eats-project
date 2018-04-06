import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Menu } from '../models/menu.interface';
import { CartService } from '../core/cart.service';
import { Cart } from '../models/cart.interface';

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  template: `
  <div class="cart">
    <button class="button uber button-fluid">장바구니 확인</button>
      <div>
        <div class="cart-group"
          *ngFor="let item of cartService.localCart">
            <div (click)="onEdit(item)">
              {{ item.name }}
            </div>
            <input
              class="input"
              type="number"
              step="1"
              min="0"
              max="20"
              [value]="item.quantity">
            <span
              type="button"
              (click)="onRemove(item.id)">
            제거
            </span>
          </div>
        </div>
      <pre>{{ cart }}</pre>
  </div>
  `
})
export class CartComponent implements OnInit {
  @Output()
  edited = new EventEmitter();

  cart: Cart[];
  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  onSubmit() {
  }

  onRemove(id) {
    this.cartService.removeItem(id);
  }

  onEdit(item) {
    this.edited.emit(item);
  }
}

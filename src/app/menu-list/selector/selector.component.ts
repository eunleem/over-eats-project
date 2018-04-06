import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators, NgModel } from '@angular/forms';

import { Menu } from '../../models/menu.interface';
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-selector',
  styleUrls: ['./selector.component.scss'],
  template: `
    <div
      class="modal-background">
      <div class="modal">
        <button class="closeButton" (click)="toggle()">
          <svg viewBox="0 0 64 64" width="16px" height="16px" class="closeButtonBase_ b4 bw a7z u8 kz l0 a80 a81 a82 a83 a84 closeButtonLight_ a3 ds">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.828 32l18.385 18.385-2.828 2.828L32 34.83 13.615 53.213l-2.828-2.828L29.172 32 10.787 13.616l2.828-2.829L32 29.172l18.385-18.385 2.828 2.829L34.828 32z">
            </path>
          </svg>
        </button>
        <h3>{{ thisItem.name }}</h3>
        <p class="menu-disc">{{ thisItem.disc }}</p>
        <div class="formgroup">
          <label>조리시 요청사항
            <input
              type="text"
              class="comment"
              [(ngModel)]="thisItem.comments || comment"
              placeholder="음식 조리 시 요청할 사항을 적어주세요">
          </label>
          <div class="group">
            <input
              type="number"
              step="1" min="0" max="20"
              [(ngModel)]="thisItem.quantity || quantity"
              required>
            <button type="button"
              (click)="onAdd()"
              class="button uber button-fluid">
              <span>장바구니 {{ thisItem.quantity || quantity }} 추가</span>
              <em>{{ thisItem.price * thisItem.quantity || thisItem.price * quantity }} 원</em>
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class SelectorComponent implements OnInit {
  @Input() thisItem: any;
  @Output() close = new EventEmitter();
  @Output() added = new EventEmitter();

  cart: Cart[] = [];
  value: 1;
  comment: string;
  quantity = 1;


  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
  }
  toggle() {
    this.close.emit(null);
  }

  onAdd() {
    const cartItem = {
      id: this.thisItem.id,
      name: this.thisItem.name,
      comments: this.comment,
      quantity: this.quantity,
      price: this.thisItem.price,
      totalPrice: this.thisItem.price * this.quantity
    };
    this.cart = [...this.cart, cartItem];
    // this.cartService.addToCart(cartItem);
    this.cartService.addToLocalCart(cartItem);
    console.log(this.cart);
    // this.added.emit(this.cart);
    this.close.emit(null);
  }

  onEdit() {
    this.close.emit(null);
  }
}


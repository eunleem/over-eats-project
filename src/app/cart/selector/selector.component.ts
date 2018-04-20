import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators, NgModel } from '@angular/forms';

import { Product } from '../../models/product.interface';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../core/cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { SearchService } from '../../core/search.service';

@Component({
  selector: 'app-selector',
  styleUrls: ['./selector.component.scss'],
  template: `
    <div
      class="modal-background">
      <div class="warning-modal-background" *ngIf="error">
        <div class="warning-modal">
            <p>장바구니가 이미 존재합니다. 비우시겠습니까?</p>
            <button (click)="emptyCart()" class="button warning">비우기</button>
            <button (click)="closePopup()" class="button dark">취소</button>
        </div>
      </div>
      <div class="modal">
        <button class="closeButton" (click)="toggle()">
          <svg viewBox="0 0 64 64" width="20px" height="20px"
          class="closeButtonBase_ b4 bw a7z u8 kz l0 a80 a81 a82 a83 a84 closeButtonLight_ a3 ds">
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M34.828 32l18.385 18.385-2.828 2.828L32 34.83 13.615 53.213l-2.828-2.828L29.172 32 10.787 13.616l2.828-2.829L32 29.172l18.385-18.385 2.828 2.829L34.828 32z">
            </path>
          </svg>
        </button>
        <h3>{{ item.product.title | korean }}</h3>
        <p class="menu-disc">{{ item.product.description | korean }}</p>
        <div class="formgroup">
          <label>조리시 요청사항
            <input
              type="text"
              class="comment"
              [(ngModel)]="item.comment"
              placeholder="음식 조리 시 요청할 사항을 적어주세요">
          </label>
          <div class="group">
            <div class="counter">
                <div class="button-group">
                  <button
                    class="input-button"
                    type="button"
                    (click)="decrement()"
                    [disabled]="item.quantity === min">
                  -
                  </button>
                  <input
                    disabled="true"
                    class="value"
                    type="number" [(ngModel)]="item.quantity">
                  <button
                    class="input-button"
                    type="button"
                    (click)="increment()"
                    [disabled]="item.quantity === max">
                  +
                  </button>
                </div>
              </div>
            <button
              *ngIf="!editItem"
              type="button"
              (click)="onAdd()"
              class="add-button button uber button-fluid">
              <span>장바구니 {{ item.quantity }} 추가</span>
              <em>{{ (item.product.price * item.quantity) | currency:'KRW' : 'symbol' : '1.0'}}</em>
            </button>
            <button
              *ngIf="editItem"
              type="button"
              (click)="onEdit()"
              class="add-button button uber button-fluid">
              <span>장바구니 {{ item.quantity }} 수정</span>
              <em>{{ (item.product.price * item.quantity) | currency:'KRW' : 'symbol' : '1.0'}}</em>
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class SelectorComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() editItem: any;

  cart: ShoppingCart;
  item: CartItem;
  min = 0;
  max = 20;

  error = false;

  get selectedProduct() {
    return this.cartService.selectedProduct;
  }

  get selectedRes() {
    return this.cartService.selectedRestaurant;
  }

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    if (!this.editItem) {
      this.item = this.cartService.initializeCartItem(this.selectedProduct);
    } else {
      this.item = this.editItem;
    }
    this.cartService.get().subscribe(data => {
      this.cart = data;
    });
    console.log('selected item is ', this.item);
  }

  increment() {
    this.item.quantity++;
  }

  decrement() {
    this.item.quantity--;
  }

  toggle() {
    this.close.emit(null);
  }

  emptyCart() {
    this.cartService.emptyCart();
    this.closePopup();
  }

  closePopup() {
    this.error = false;
  }

  onAdd() {
    try {
      this.cartService.addItem(this.item, this.selectedRes);
      this.close.emit(null);
    } catch (error) {
      this.error = true;
      console.log('please empty your cart first');
    }
  }

  onEdit() {
    this.cartService.editItem(this.item);
    this.close.emit(null);
  }



}


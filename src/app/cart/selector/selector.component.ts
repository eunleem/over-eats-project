import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators, NgModel } from '@angular/forms';

import { Product } from '../../models/product.interface';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-selector',
  styleUrls: ['./selector.component.scss'],
  template: `
    <div
      class="modal-background">
      <div class="modal">
        <button class="closeButton" (click)="toggle()">
          <svg viewBox="0 0 64 64" width="16px" height="16px"
          class="closeButtonBase_ b4 bw a7z u8 kz l0 a80 a81 a82 a83 a84 closeButtonLight_ a3 ds">
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M34.828 32l18.385 18.385-2.828 2.828L32 34.83 13.615 53.213l-2.828-2.828L29.172 32 10.787 13.616l2.828-2.829L32 29.172l18.385-18.385 2.828 2.829L34.828 32z">
            </path>
          </svg>
        </button>
        <h3>{{ item.product.title }}</h3>
        <p class="menu-disc">{{ item.product.description }}</p>
        <div class="formgroup">
          <label>조리시 요청사항
            <input
              type="text"
              class="comment"
              [(ngModel)]="item.comments"
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
                  <input class="value"
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
              <em>{{ item.product.price * item.quantity }} 원</em>
            </button>
            <button
              *ngIf="editItem"
              type="button"
              (click)="onEdit()"
              class="add-button button uber button-fluid">
              <span>장바구니 {{ item.quantity }} 수정</span>
              <em>{{ item.product.price * item.quantity }} 원</em>
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

  item: CartItem;
  min = 0;
  max = 20;

  get selectedProduct() {
    return this.cartService.selectedProduct;
  }

  constructor(private cartService: CartService) {}

  ngOnInit() {
    if (!this.editItem) {
      this.item = this.cartService.initializeCartItem(this.selectedProduct);
    } else {
      this.item = this.editItem;
    }
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

  onAdd() {
    this.cartService.addItem(this.item);
    this.close.emit(null);
  }

  onEdit() {
    this.cartService.editItem(this.item);
    this.close.emit(null);
  }


}


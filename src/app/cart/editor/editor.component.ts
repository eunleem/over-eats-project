import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators, NgModel } from '@angular/forms';

import { Product } from '../../models/product.interface';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-editor',
  styleUrls: ['./editor.component.scss'],
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
        <h3>{{ editItem?.product.title }}</h3>
        <p class="menu-disc">{{ editItem?.product.description }}</p>
        <div class="formgroup">
          <label>조리시 요청사항
            <input
              type="text"
              class="comment"
              [(ngModel)]="editItem.comments"
              placeholder="음식 조리 시 요청할 사항을 적어주세요">
          </label>
          <div class="group">
            <div class="counter">
                <div class="button-group">
                  <button
                    class="input-button"
                    type="button"
                    (click)="decrement()"
                    [disabled]="quantity === min">
                  -
                  </button>
                  <p class="value">{{ quantity }}</p>
                  <button
                    class="input-button"
                    type="button"
                    (click)="increment()"
                    [disabled]="quantity === max">
                  +
                  </button>
                </div>
              </div>
            <button type="button"
              (click)="onEdit()"
              class="button uber button-fluid">
              <span>장바구니 {{ quantity }} 수정</span>
              <em>{{ editItem?.product.price * quantity}} 원</em>
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class EditorComponent implements OnInit {
  @Input() editItem: any;
  @Output() close = new EventEmitter();

  comment = '';
  min = 0;
  max = 20;
  quantity: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.quantity = this.editItem.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  toggle() {
    this.close.emit(null);
  }

  onEdit() {
    this.cartService.editItem(this.editItem.product, this.quantity, this.editItem.comments);
    this.close.emit(null);
  }

}


import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators, NgModel } from '@angular/forms';

import { Menu } from '../../models/menu.interface';

@Component({
  selector: 'app-selector',
  styleUrls: ['./selector.component.scss'],
  template: `
    <div
      class="modal-background">
      <div class="modal">
        <button class="closeButton" (click)="toggle()">
          <svg viewBox="0 0 64 64" width="16px" height="16px" class="closeButtonBase_ b4 bw a7z u8 kz l0 a80 a81 a82 a83 a84 closeButtonLight_ a3 ds"><path fill-rule="evenodd" clip-rule="evenodd" d="M34.828 32l18.385 18.385-2.828 2.828L32 34.83 13.615 53.213l-2.828-2.828L29.172 32 10.787 13.616l2.828-2.829L32 29.172l18.385-18.385 2.828 2.829L34.828 32z"></path></svg>
        </button>
        <h3>{{ thisItem.title }}</h3>
        <p class="menu-disc">{{ thisItem.disc }}</p>
        <div>
          <input type="number"
            step="1" min="0" max="20"
            value="value"
            required
            [(ngModel)]="value">
          <button type="button" class="button uber button-fluid"
            (click)="onAdd()"><span>장바구니 {{ quantity }} 추가</span><em>{{ thisItem.price | currency:'KRW' }}</em></button>
        </div>

      </div>
    </div>
  `
})
export class SelectorComponent implements OnInit {
  @Input() thisItem: Menu;

  @Output() close = new EventEmitter();
  @Output() added = new EventEmitter();
  form: FormGroup;
  value: 1;
  createForm() {
    this.form = this.fb.group({
      quantity: ['1', Validators.required],
    });
  }


  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }
  toggle() {
    this.close.emit(null);
  }
  onAdd() {
    const cartItem = { menu_id: this.thisItem.id, quantity: this.value };
    this.added.emit(cartItem);
    this.close.emit(null);
  }
}

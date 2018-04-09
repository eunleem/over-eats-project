import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from '../../core/cart.service';


@Component({
  selector: 'app-select',
  styleUrls: ['./select.component.scss'],
  template: `
  <app-select-modal (submitted)="add($event)">
    <h3>{{ thisItem.name }}</h3>
    <p class="menu-disc">{{ thisItem.disc }}</p>
    <button
      type="submit">
    장바구니 {{ quantity }} 추가
    <em>{{ thisItem.price * quantity }} 원</em>
    </button>
  </app-select-modal>
  `
})
export class SelectComponent implements OnInit {
  @Input() thisItem: any;
  @Output() close = new EventEmitter();

  ngOnInit(): void {}

  constructor(private cartService: CartService) {}


  add(e: FormGroup) {
    console.log('add', event);
    this.cartService.addItem(this.thisItem, e.value.quantity, e.value.comment);
    this.close.emit(null);
  }
}

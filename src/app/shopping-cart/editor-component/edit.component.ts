import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from '../../core/cart.service';


@Component({
  selector: 'app-edit',
  styleUrls: ['./edit.component.scss'],
  template: `
  <app-select-modal (submitted)="edit($event)">
    <h3>{{ editItem?.product.name }}</h3>
    <p class="menu-disc">{{ editItem?.product.disc }}</p>
    <button
      type="submit">
    장바구니 {{ quantity }} 추가
    <em>{{ thisItem.price * quantity }} 원</em>
    </button>
  </app-select-modal>
  `
})
export class EditComponent implements OnInit {
  @Input() editItem: any;
  @Output() close = new EventEmitter();

  ngOnInit(): void { }

  constructor(private cartService: CartService) { }


  edit(e: FormGroup) {
    console.log('edit', event);
    this.cartService.editItem(this.editItem.product, e.value.quantity, e.value.comment);
    this.close.emit(null);
  }
}

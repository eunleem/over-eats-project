import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order.interface';
import { ShoppingCart } from '../models/shopping-cart.model';
import { CartService } from '../core/cart.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  showCalendar = false;
  myDate = Date.now();
  days: [0, 1, 2, 3, 4, 5, 6];
  form: FormGroup;
  orderForm: Order;
  cart: Observable<ShoppingCart>;

  order: ShoppingCart;


  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cart = this.cartService.get();
    this.cart.subscribe(data => {
      this.order = data;
      console.log(this.order);
    });
    this.form = this.fb.group({
      delivery: this.fb.group({
        date_time: '',
        address: '',
        address_detail: '',
        position: this.fb.group({ lat: '', lng: '' }),
        comment: ''
      }),
      payment: this.fb.group({
        form: 'card',
        num: ['', Validators.required]
      })
    });

    this.form.valueChanges
      .filter(data => this.form.valid)
      .subscribe(data => {
        data.payment.num = data.payment.num.replace(/1/, 'hi');
        data.delivery.date_time = Date.now();
        this.orderForm = Object.assign({}, data);
      });
  }
  goCheckout() {
    this.orderForm = Object.assign({}, this.orderForm, { order: this.order });
    console.log(this.orderForm);
  }
}

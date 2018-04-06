import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Cart } from '../models/cart.interface';

@Injectable()
export class CartService {
  cart: Cart[];
  localCart: Cart[] = [];
  url = 'http://localhost:4500/cart';

  constructor(private http: HttpClient) {
    this.getCart();
  }

  getCart() {
    console.log('getting cart items');
    this.http.get<Cart[]>(this.url)
      .subscribe(cart => this.cart = cart);
  }

  addToLocalCart(item: Cart) {
    const newItem = {
      id: item.id,
      name: item.name,
      comments: item.comments,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice
    };
    this.localCart = [...this.localCart, newItem];
  }

  addToCart(item: Cart) {
    const newItem = {
      id: item.id,
      name: item.name,
      comments: item.comments,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice
    };
    this.http.post(this.url, newItem)
      .subscribe(() => this.cart = [...this.cart, newItem]);
  }

  removeItem(id: number) {
    this.http.delete(`${this.url}/id/${id}`, {responseType: 'text'})
      .subscribe(() => this.cart = this.cart.filter(item => item.id !== id));
  }

  updateItem(item: Cart) {
    this.http.patch(`${this.url}/id/${item.id}`, { quantity: item.quantity, comments: item.comments }, {responseType: 'text'})
      .subscribe(() => this.cart = this.cart.map( cart => {
        return cart.id === item.id ? Object.assign(cart, { quantity: item.quantity, comments: item.comments }) : cart;
      }));
  }
}

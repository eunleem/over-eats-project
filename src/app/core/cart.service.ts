import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.interface';
import { ShoppingCart } from '../models/shopping-cart.model';

import { SearchService } from './search.service';

const CART_KEY = 'cart';
@Injectable()
export class CartService {
  products: Product[];
  subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  subscriptionObservable: Observable<ShoppingCart>;

  constructor(private searchService: SearchService) {
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
    });
  }

  get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  addItem(product: Product, quantity: number, comment: string) {
    const cart = this.retrieve();
    let item = cart.items.find(ci => ci.product.uuid === product.uuid);
    if (item === undefined) {
      item = new CartItem();
      item.product = product;
      cart.items.push(item);
    }

    item.quantity += quantity;
    item.comments = comment;
    cart.items = cart.items.filter((i) => i.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
    console.log(cart);
  }

  // editItem(product: Product, quantity: number, comment: string)
  editItem(product: Product, quantity: number, comment: string) {
    const cart = this.retrieve();
    const item = cart.items.find(ci => ci.product.uuid === product.uuid);

    item.quantity = quantity;
    item.comments = comment;
    cart.items = cart.items.filter(i => i.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  removeItem(id: string) {
    const cart = this.retrieve();
    cart.items = cart.items.filter(item => item.product.uuid !== id);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  calculateCart(cart: ShoppingCart) {
    cart.itemsTotal = cart.items
      .map(item => item.quantity * item.product.price)
      .reduce((prev, current) => prev + current, 0);
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }

  save(cart: ShoppingCart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  dispatch(cart: ShoppingCart) {
    this.subscribers.forEach(sub => {
      try {
        sub.next(cart);
      } catch (e) {

      }
    });
  }


}

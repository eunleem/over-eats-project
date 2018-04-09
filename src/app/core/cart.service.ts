import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.interface';
import { ShoppingCart } from '../models/shopping-cart.model';

import { ProductsService } from './products.service';

const CART_KEY = 'cart';
@Injectable()
export class CartService {
  products: Product[];
  subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  subscriptionObservable: Observable<ShoppingCart>;

  constructor(private productsService: ProductsService) {
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
    });
    this.productsService.getProducts().subscribe((data: Product[]) => this.products = data);
  }

  get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  addItem(product: Product, quantity: number, comment: string) {
    const cart = this.retrieve();
    let item = cart.items.find(cp => cp.product_id === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.product_id = product.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    item.comments = comment;
    cart.items = cart.items.filter((i) => i.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  // editItem(product: Product, quantity: number, comment: string)
  editItem(product: Product, quantity: number, comment: string) {
    const cart = this.retrieve();
    const item = cart.items.find(cp => cp.product_id === product.id);

    item.quantity = quantity;
    item.comments = comment;
    cart.items = cart.items.filter(i => i.quantity > 0);

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  removeItem(id: number) {
    const cart = this.retrieve();
    cart.items = cart.items.filter(item => item.product_id !== id);

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
      .map(item => item.quantity * this.products.find(p => p.id === item.product_id).price)
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

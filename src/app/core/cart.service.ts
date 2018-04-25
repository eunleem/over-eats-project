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
  cart: ShoppingCart;

  // setter and getter
  selectedRestaurant;
  selectedProduct: Product;

  subscribers = new Array<Observer<ShoppingCart>>();
  subscriptionObservable: Observable<ShoppingCart>;

  constructor(private searchService: SearchService) {
    this.subscriptionObservable = new Observable<ShoppingCart>((observer) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
    });
  }

  get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  initializeCartItem(product: Product): CartItem {
    return {
      quantity: 1,
      comment: '',
      product: product
    };
  }


  addItem(product: CartItem, restaurant: any) {
    const cart = this.retrieve();
    if (cart.restaurant && cart.restaurant.uuid !== restaurant.uuid) {
      throw Error;
    }
    let item = cart.items.find(ci => ci.product.uuid === product.product.uuid);
    if (item === undefined) {
      item = new CartItem();
      item.product = product.product;
      cart.items.push(item);
    }
    cart.restaurant = restaurant;
    cart.comment = '';
    item.quantity += product.quantity;
    item.comment = product.comment;
    cart.items = cart.items.filter((i) => i.quantity > 0);

    // this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }


  editItem(product: CartItem) {
    const cart = this.retrieve();
    const item = cart.items.find(ci => ci.product.uuid === product.product.uuid);

    item.quantity = product.quantity;
    item.comment = product.comment;
    cart.items = cart.items.filter(i => i.quantity > 0);


    // this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  removeItem(id: string) {
    const cart = this.retrieve();
    cart.items = cart.items.filter(item => item.product.uuid !== id);
    if (cart.items.length < 1) {
      cart.restaurant = '';
    }
    // this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  emptyCart() {
    const cart = this.retrieve();
    cart.items = [];
    cart.restaurant = '';
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

  // calculateCart(cart: ShoppingCart) {
  //   cart.itemsTotal = cart.items
  //     .map(item => item.quantity * item.product.price)
  //     .reduce((prev, current) => prev + current, 0);
  // }

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

import { CartItem } from '../models/cart-item.model';


export class ShoppingCart {
  public restaurant: any;
  public items: CartItem[] = new Array<CartItem>();
  public comment: string;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.restaurant = src.restaurant;
  }
}

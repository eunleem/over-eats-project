import { CartItem } from '../models/cart-item.model';

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public grossTotal = 0;
  public deliveryTotal = 0;
  public itemsTotal = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}

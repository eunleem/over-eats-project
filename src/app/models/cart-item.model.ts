import { Product } from './product.interface';

export class CartItem {
  public quantity = 0;
  public comment = '';
  public product: Product;
}

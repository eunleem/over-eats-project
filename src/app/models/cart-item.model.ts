import { Product } from './product.interface';

export class CartItem {
  public quantity = 0;
  public comments = '';
  public product: Product;
}

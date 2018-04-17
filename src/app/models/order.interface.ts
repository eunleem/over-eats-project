import { ShoppingCart } from './shopping-cart.model';

export interface Order {
  delivery: {
    position: {
      lat: string;
      lng: string;
    }
    address: string;
    address_detail: string;
    comment: ''
    date_time: string;
  };
  payment: {
    form: 'card';
    num: string;
  };
  order: '';
}

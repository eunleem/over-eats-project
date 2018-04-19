import { ShoppingCart } from './shopping-cart.model';

export interface Order {
  delivery: {
    lat: string;
    lng: string;
    address: string;
    address_detail: string;
    comment: ''
    date_time: string;
  };
  payment: {
    method: 'card';
    num: string;
  };
  order: {
    restaurant: string;
    items: {
      item: string;
      comment: '';
      cnt: number;
    }
    comment: '';
  };
}


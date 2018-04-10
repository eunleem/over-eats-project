import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.interface';

@Injectable()
export class ProductsService {
  private products: Observable<Product[]>;

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../../assets/products.json');
  }
}

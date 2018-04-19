import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product.interface';
import { Order } from '../models/order.interface';

const ADDRESS = 'address';
interface SearchResult {
   search_text: string;
   result: any[];
}

@Injectable()
export class SearchService {
  URL = environment.apiUrl;
  addressResult;
  constructor(private http: HttpClient) { }

  searchAddress(term) {
    console.log('searching addresses');
    return this.http.post<SearchResult>(`${this.URL}/address/`, { search_text: term, language: 'ko' }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  saveAddress(address) {
    this.addressResult = address;
    localStorage.setItem(ADDRESS, JSON.stringify(address));
  }

  getAddress() {
    const address = JSON.parse(localStorage.getItem(ADDRESS));
    return address;
  }

  // restaurant services
  getRestaurants(geometry): Observable<any> {
    console.log('getting restaurants from db');
    const {lat, lng} = geometry;
    return this.http.get(`${this.URL}/restaurant/?lat=${lat}&lng=${lng}`);
  }

  getRestaurant(uuid): Observable<any> {
    return this.http.get(`${this.URL}/restaurant/${uuid}`);
  }

  loadMore(url) {
    return this.http.get(url);
  }

  // get menu
  getProducts(uuid): Observable<any> {
    return this.http.get<any>(`${this.URL}/restaurant/${uuid}/menu`);
  }


  getImage(geometry) {
    const { lat, lng } = geometry;
    return `${this.URL}/address/map/?lat=${lat}&lng=${lng}`;
  }

  sendOrder(form, token): Observable<any> {
    console.log('sending order');
    const tokenstr = `token ${token}`;
    return this.http.post<Order>(`${this.URL}/order/payment/`, form , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tokenstr
      })
    });
  }
}

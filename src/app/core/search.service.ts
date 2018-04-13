import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


interface SearchResult {
   search_text: string;
   result: any[];
}

@Injectable()
export class SearchService {
  URL = environment.apiUrl;
  selectedRes = {};
  products = {};

  constructor(private http: HttpClient) { }

  searchAddress(term) {
    console.log('searching addresses');
    return this.http.post<SearchResult>(`${this.URL}/address/`, { search_text: term }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  // restaurant services
  getRestaurant(geometry): Observable<any> {
    console.log('getting restaurants from db');
    const {lat, lng} = geometry;
    return this.http.get(`${this.URL}/restaurant/?lat=${lat}&lng=${lng}`);
  }

  loadMore(url) {
    return this.http.get(url);
  }

  // get menu
  getProducts(uuid): Observable<any> {
    return this.http.get(`${this.URL}/restaurant/${uuid}/menu`);
  }

  // set restaurant
  setRestaurant(restaurant) {
    this.selectedRes = restaurant;
  }

}




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

interface SearchResult {
   search_text: string;
   result: any[];
}

@Injectable()
export class SearchService {
  URL = 'https://www.overeats.kr/api';

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => this.searchAddress(term));
  }

  searchAddress(term) {
    return this.http.post<SearchResult>(`${this.URL}/address/`, { search_text: term }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}




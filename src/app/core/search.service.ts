import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

interface SearchResult {
   search_text: string;
   result: any[];
}

interface SearchInput {
  search_text: string;
}

@Injectable()
export class SearchService {
  URL = 'https://www.overeats.kr/api';


  constructor(private http: HttpClient) { }


  search(text: string): Observable<SearchResult> {
    return this.http.post<SearchResult>(`${this.URL}/address/`, {search_text: text}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}

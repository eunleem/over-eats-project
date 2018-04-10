import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { SearchService } from '../../core/search.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

interface SearchResult {
  search_text: string;
  result: any[];
}

@Component({
  selector: 'app-search',
  styleUrls: ['./search.component.scss'],
  template: `
  <div
  class="search-group"
  [ngClass]="{'onHeader': onMenu, 'onMain': !onMenu}">
  <div class="input-group">
    <label>
      <i class="fas fa-map-marker-alt"></i>
      <input
        type="text"
        class="input uber input-search"
        name="searchAddress"
        (keyup)="searchAddress($event.target.value)"
        (keydown)="onKeyDown($event)"
        placeholder="배달 주소를 입력하세요">
      <ul
        *ngIf="addresses"
        class="search-list">
        <li class="button"
          *ngFor="let address of addresses; let i = index"
          [class.active] = "i == arrowKeyLocation"
          (click)="sendAddress(address)">
          <em>{{ address.formatted_address }}</em>
        </li>
      </ul>
    </label>
  </div>
</div>
  `
})
export class SearchComponent implements OnInit {

  @Input()
  onMenu: boolean;

  arrowKeyLocation = 0;
  searchTerm$ = new Subject<string>();
  addresses: any;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
      this.searchService.search(this.searchTerm$)
        .subscribe(results => {
          this.addresses = results.result;
          console.log(this.addresses);
        });
  }

  ngOnInit() { }

  searchAddress(value) {
    if (value && value.length > 1) {
      this.searchTerm$.next(value);
    }
  }

  sendAddress(address) {
    this.router.navigate(['menu', address.place_id]);
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowDown':
        this.arrowKeyLocation++;
        break;
      case 'ArrowUp':
        this.arrowKeyLocation--;
        break;
      default:
        break;
    }
  }

}

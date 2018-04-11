import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { SearchService } from '../../core/search.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { PreloaderService } from '../preloader/preloader.service';

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
       <span *ngIf="!isShow">
          <i class="fas fa-map-marker-alt"></i>
        </span>
      <app-preloader *ngIf="isShow" [onMenu]="isHeader"></app-preloader>
      <input
        type="text"
        class="input uber input-search"
        name="searchAddress"
        (keyup)="searchAddress($event.target.value)"
        (keyup.arrowup)="onKeyDown($event)"
        (keyup.arrowdown)="onKeyDown($event)"
        placeholder="배달 주소를 입력하세요">
      <ul
        *ngIf="addresses"
        class="search-list">
        <li class="button"
          *ngFor="let address of addresses; let i = index"
          [class.active] = "i == arrowKeyLocation"
          (click)="sendAddress(address.geometry)">
          <em>{{ address.formatted_address }}</em>
        </li>
      </ul>
    </label>
  </div>
</div>
  `
})
export class SearchComponent implements OnInit, AfterViewInit {

  @Input()
  onMenu: boolean;

  isHeader = true;
  isShow = false;

  arrowKeyLocation = 0;
  searchTerm$ = new Subject<string>();
  addresses: any[];


  constructor(
    private router: Router,
    private searchService: SearchService,
    public preloader: PreloaderService
  ) {
      this.search(this.searchTerm$)
        .subscribe(results => {
          this.addresses = results.result;
          this.isShow = false;
          console.log(this.addresses);
        }, error => {
          this.isShow = false;
        });
  }

  ngOnInit() {
  }

  searchAddress(value) {
    if (value && value.length > 1) {
      this.searchTerm$.next(value);
    }
  }

  search(terms: Observable<string>) {
    return terms.debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => {
        this.isShow = true;
        return this.searchService.searchAddress(term);
      });
  }


  sendAddress(geometry) {
    console.log(geometry);
    this.router.navigate(['/restaurants', { lat: geometry.lat, lng: geometry.lng }]);
    this.addresses = [];
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

  ngAfterViewInit() {
    this.isShow = false;
  }

}

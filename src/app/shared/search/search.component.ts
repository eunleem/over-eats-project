import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../core/search.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Observable operators
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


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
        [formControl]="searchInput"
        placeholder="배달 주소 입력 *도로명/지번주소 + 번지수 기입 필수* ">
      <ul
        *ngIf="addresses"
        class="search-list">
        <li class="button"
          *ngFor="let address of addresses"
          (click)="sendAddress(address)">
          <em>{{ address.formatted_address }}</em>
        </li>
      </ul>
    </label>
    <button
      class="button uber button-main hideOnMobile"
      *ngIf="!onMenu"
      (click)="onEnter()">음식 찾기</button>
  </div>
</div>
  `
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input()
  onMenu: boolean;

  value = '';
  searchInput = new FormControl('');
  addresses: any;
  subscription: Subscription;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.subscription = this.searchInput.valueChanges
        .debounceTime(1000)
        .switchMap(input => this.getAddress(input))
        .subscribe(address => {
          this.addresses = address.result;
          console.log(this.addresses);
        });
  }

  onSearch() {
    if (this.value.length > 1) {
      this.searchService.search(this.value)
        .subscribe(
          (data) => {
            this.addresses = data.result;
            console.log(data.result);
          }
        );
    }
  }
  sendAddress(address) {
    this.router.navigate(['/menu', address.place_id]);
  }
  onEnter() {
    this.router.navigate(['/menu', 123]);
  }

  getAddress(address: string): Observable<SearchResult> {
    return this.searchService.search(address);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

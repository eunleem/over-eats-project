import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SearchService } from '../../core/search.service';
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
      <app-preloader *ngIf="isShow" [onMenu]="onMenu"></app-preloader>
      <input
        type="text"
        class="input uber input-search"
        name="searchAddress"
        [(ngModel)]="terms"
        (ngModelChange)="searchAddress(terms)"
        (keyup.arrowup)="onKeyDown($event)"
        (keyup.arrowdown)="onKeyDown($event)"
        placeholder="배달 주소를 입력하세요">
      <ul
        *ngIf="addresses"
        class="search-list">
        <li
          class="button"
          *ngFor="let address of addresses; let i = index"
          (click)="sendAddress(address)"
          [class.active] = "i == arrowKeyLocation">
          <a>
          {{ address.formatted_address }}
          </a>
        </li>
      </ul>
    </label>
  </div>
</div>
  `
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() onMenu: boolean;
  @Input() onMain: boolean;

  isHeader = true;
  isShow = false;
  results;
  terms: string;
  arrowKeyLocation = 0;
  searchTerm$ = new Subject<string>();
  addresses: any[];


  constructor(
    private router: Router,
    private searchService: SearchService,
    public preloader: PreloaderService
  ) {
    this.results = this.search(this.searchTerm$)
      .subscribe(results => {
        this.terms = '';
        this.addresses = results.result;
        this.isShow = false;
        console.log('result', this.addresses);
      }, error => {
        this.isShow = false;
      });
  }


  ngOnInit() {
    this.isShow = false;
  }

  ngOnDestroy(): void {
    this.results.unsubscribe();
  }

  searchAddress(terms) {
    if (terms && terms.length > 1) {
      this.searchTerm$.next(terms);
    }
  }

  search(term: Observable<string>) {
    return term
      .debounceTime(1000)
      .distinctUntilChanged()
      .filter(str => !!str)
      .switchMap(res => {
        this.isShow = true;
        return this.searchService.searchAddress(res);
      });
  }

  sendAddress(address) {
    this.router.navigate(['/restaurants', address.geometry.lat, address.geometry.lng]);
    this.addresses = undefined;
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

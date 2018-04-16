import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { hostElement } from '@angular/core/src/render3/instructions';
import { NgModel } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../core/search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  isShow: boolean; // 스크롤 이동에 따른 버튼의 표시
  restaurants: any;
  value: string;
  id: number;

  today = new Date().getDay();
  isLoading = false;
  nextPage: string;
  hideMoreButton = false;

  sub;
  subscription;

  constructor(
    public el: ElementRef,
    private activateRoute: ActivatedRoute,
    private searchService: SearchService,
    public router: Router
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.isLoading = true;
    let geometry;
    this.sub = this.activateRoute
      .params.subscribe(params => {
      geometry = params;
      this.searchService.getRestaurants(geometry)
        .subscribe((data: any) => {
          console.log(data);
          this.isLoading = false;
          this.restaurants = data.restaurants;
          this.nextPage = data.next;
        });
    });
  }

  getOpenTime(restaurant) {
    if (this.today > 5) { this.today = 0; }
    const time = restaurant.open_time.map(item => item.start_time)[this.today];
    const hour = Math.floor(time / 60);
    const min = Math.floor(time % 60);
    return `${hour} : ${min === 0 ? '00' : min}`;
  }

  goUp() {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    });
  }

  @HostListener('window:scroll', [])
    checkScroll() {
      const position = this.el.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition >= position) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }

  loadMore() {
    if (this.nextPage) {
      this.subscription = this.searchService.loadMore(this.nextPage)
        .subscribe((data: any) => {
          this.restaurants = [...this.restaurants, ...data.restaurants];
          this.nextPage = data.next;
        });
    } else {
      this.subscription.unsubscribe();
    }
  }

  selectedRestaurant(restaurant) {
    this.router.navigate(['/restaurant', `${restaurant.uuid}`]);
  }
}

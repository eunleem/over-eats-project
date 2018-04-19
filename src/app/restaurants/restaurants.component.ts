import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { hostElement } from '@angular/core/src/render3/instructions';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

// import { RestaurantsService } from '../core/restaurants.service';
import { SearchService } from '../core/search.service';
import { CartService } from '../core/cart.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {

  isShow: boolean; // 스크롤 이동에 따른 버튼의 표시
  restaurants: any;
  category: any;
  moreCategory: any;
  value: string;
  id: number;
  geometry: any;

  today = new Date().getDay();
  isLoading = false;
  nextPage: string;
  hideMoreButton = false;
  subscription: Subscription;

  // category variables
  isClick = false;
  showContainer = false;

  constructor(
    public el: ElementRef,
    private activateRoute: ActivatedRoute,
    private searchService: SearchService,
    private cartService: CartService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.activateRoute
      .params.subscribe(params => {
        this.geometry = params;
        this.searchService.getRestaurants(this.geometry)
          .subscribe((data: any) => {
            this.isLoading = false;
            this.restaurants = data.restaurants;
            this.nextPage = data.next;
          });
    });

    this.searchService.getCategory()
    .subscribe(res => this.category = res.categories);
    this.searchService.getMoreCategory()
      .subscribe(res => this.moreCategory = res.categories.splice(10.1));
    this.isClick = false;
    this.showContainer = false;
  }

  getOpenTime(restaurant) {
    console.log('open', restaurant);
    if (this.today > 5) { this.today = 0; }
    const time = restaurant.open_time.map(item => item.start_time)[this.today + 1];
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

    closeContainer() {
      this.value = '';
      this.isClick = false;
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

  get selectedRes() {
    return this.cartService.selectedRestaurant;
  }
  set selectedRes(res) {
    console.log('res', res);
    this.cartService.selectedRestaurant = res;
  }
  selectedRestaurant(restaurant) {
    this.selectedRes = restaurant;
    console.log('selec', this.selectedRes);
    this.router.navigate(['/restaurant', `${restaurant.uuid}`]);
  }

  search(value: string) {
    this.isClick = false;
    this.searchService.getRestaurantsByKeyword(this.geometry , value)
    .subscribe((res: any) =>
      this.restaurants = res.restaurants
    );
  }
  selectedCategory(category) {
    this.isClick = false;
    this.searchService.getRestaurantsByKeyword(this.geometry, category.name)
    .subscribe((res: any) =>
      this.restaurants = res.restaurants
    );
  }
}

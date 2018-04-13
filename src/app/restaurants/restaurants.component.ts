import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { hostElement } from '@angular/core/src/render3/instructions';
import { NgModel } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Restaurant } from '../models/restaurant';

import { RestaurantsService } from '../core/restaurants.service';
import { SearchService } from '../core/search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  isShow: boolean; // 스크롤 이동에 따른 버튼의 표시
  showContainer = false; // 검색에 값을 넣을 때의 컨테이너 표시
  isClick = false; // 검색창에 값을 넣을 때의 표시
  restaurants: any;
  moreLists: Restaurant[];
  open: Restaurant['open']; // 오픈하지 않은 매장의 명도처리
  value: string;
  id: number;

  today = new Date().getDay();
  isLoading = false;
  nextPage: string;
  hideMoreButton = false;

  sub;

  constructor(
    public http: HttpClient,
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
    let geometry: any;
    this.sub = this.activateRoute
      .params.subscribe(params => {
      geometry = params;
      this.searchService.getRestaurant(geometry)
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
   // 스크롤을 최상단으로 부드럽게 이동
  goUp() {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    });
  }

   // 스크롤의 위치를 감지해서 스크롤업버튼을 활성화
  @HostListener('window:scroll', [])
    checkScroll() {
      const position = this.el.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset;

      const d = document.documentElement;
      const offset = d.scrollTop + window.innerHeight;
      const height = d.offsetHeight;

      if (scrollPosition >= position) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }

      if ( offset === height ) {
        // infinite scrolling
        this.loadMore();
      }
    }

    // 클릭하면 placeholder가 변경 / 상위 카테고리, 더 많은 카테고리가 나옴
  click() {
    // 상위 카테고리
    // this.restaurantService.getCategory()
    // .subscribe(category => this.restaurants = category);
    // 더 많은 카테고리
    // this.restaurantService.getMoreCategory()
    // .subscribe(MoreCategory => this.moreLists = MoreCategory);
    // placeholder 변경
  //   this.isClick = !this.isClick;
  //   this.showContainer = !this.showContainer;
  }


  // 더보기를 누르면 추가적인 레스토랑 리스트가 나온다.
  loadMore() {
    if (this.nextPage) {
      this.searchService.loadMore(this.nextPage)
        .subscribe((data: any) => {
          this.restaurants = [...this.restaurants, ...data.restaurants];
          this.nextPage = data.next;
          if (!this.nextPage) { this.hideMoreButton = true; }
        });
    }
  }

    // 텍스트를 지우면 카테고리 컨테이너가 사라짐
  input() {
    if (this.value = '') {
      this.showContainer = false;
    }
  }

  // 버튼을 누르면 컨테이너가 사라짐
  removeCategory() {
    this.showContainer = false;
  }

  selectedRestaurant(restaurant) {
    this.router.navigate(['/restaurant', `${restaurant.uuid}`]);
    this.searchService.setRestaurant(restaurant);
  }

}

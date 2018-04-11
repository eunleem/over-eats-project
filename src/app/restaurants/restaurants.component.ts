import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hostElement } from '@angular/core/src/render3/instructions';
import { NgModel } from '@angular/forms';

import { Restaurants } from '../models/restaurant.interface';
import { RestaurantsService } from '../core/restaurants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  isShow: boolean; // 스크롤 이동에 따른 버튼의 표시
  showContainer: boolean; // 검색에 값을 넣을 때의 컨테이너 표시
  isClick: boolean; // 검색창에 값을 넣을 때의 표시
  restaurants: Restaurants[];
  moreLists: Restaurants[];
  value: string;

  constructor(
    public http: HttpClient,
    public el: ElementRef,
    private restaurantService: RestaurantsService,
    public router: Router
  ) {}
  ngOnInit() {
    this.restaurantService.getRestaurants()
    .subscribe(restaurants => this.restaurants = restaurants);
    this.showContainer = false;
    this.isClick = false;
    // this.checkTime();
  }


   // 스크롤을 최상단으로 부드럽게 이동
  goUp() {
    this.checkTime();
    console.log(this.restaurants);
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    });
  }

   // 스크롤의 위치를 감지해서 스크롤업버튼을 활성화
  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const position = this.el.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition >= position) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }

    // 클릭하면 placeholder가 변경 / 상위 카테고리, 더 많은 카테고리가 나옴
  click() {
    // 상위 카테고리
    this.restaurantService.getCategory()
    .subscribe(category => this.restaurants = category);
    // 더 많은 카테고리
    this.restaurantService.getMoreCategory()
    .subscribe(MoreCategory => this.moreLists = MoreCategory);
    // placeholder 변경
    this.isClick = !this.isClick;
    this.showContainer = !this.showContainer;
  }

  // 더보기를 누르면 추가적인 레스토랑 리스트가 나온다.
  loadMore() {
    this.restaurantService.loadMore()
      .subscribe(loadMore => this.restaurants = [...this.restaurants, ...loadMore]);
    console.log('a', this.restaurants);
  }

    // 텍스트를 지우면 카테고리 컨테이너가 사라짐
  input(value: string) {
    const lengthValue = value.length;
    if (lengthValue === 0) {
      this.showContainer = false;
    }
  }

  // 버튼을 누르면 컨테이너가 사라짐
  removeCategory() {
    this.showContainer = false;
  }

  // 레스토랑을 클릭하면 넘어감
  selectedRestaurant(id: number) {
    console.log(id);
    this.router.navigate(['menu/', id]);
  }

  // 운영시간과 현재 시간을 비교해서 내일 몇시에 여는지 표시해주기
  checkTime() {
    const today = (new Date()).getDay(); // 3
    const restaurantOpenTime = this.restaurants[0].restaurants.open_time;
    // console.log('restaurant', restaurantOpenTime, today);
    // console.log('today', restaurantOpenTime[today].start_time);
    const nextOpenTime = Math.floor((restaurantOpenTime[today].start_time) / 60);
    const nextOpenMin = (restaurantOpenTime[today].start_time) % 60;
    // console.log(nextOpenTime, nextOpenMin);
    return nextOpenTime + ':' + nextOpenMin + '분 AM 오픈';
  }
  checkOpen() {
    const status = this.restaurants[0].restaurants.r_status;
    if (status === 'ACTIVE') {
      return true;
    } else {
      return false;
    }
  }
}

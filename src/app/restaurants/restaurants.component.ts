import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { hostElement } from '@angular/core/src/render3/instructions';
import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

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
  isClick: boolean;
  showContainer: boolean;
  restaurants: any;
  value: string;
  id: number;

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
  ) {}

  ngOnInit() {
    this.isLoading = true;
    let geometry;
    this.activateRoute
      .params.subscribe(params => {
        geometry = params;
        this.searchService.getRestaurants(geometry)
          .subscribe((data: any) => {
            this.isLoading = false;
            this.restaurants = data.restaurants;
            this.nextPage = data.next;
          });
    });
    this.isClick = false;
    this.showContainer = false;
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

    closeContainer() {
      this.value = '';
      this.isClick = false;
    }

    // 클릭하면 placeholder가 변경 / 상위 카테고리, 더 많은 카테고리가 나옴
  // click() {
  //   this.isClick = !this.isClick;
  //   this.showContainer = !this.showContainer;
  // }

  // // 더보기를 누르면 추가적인 레스토랑 리스트가 나온다.
  // loadMore() {
  //   this.restaurantService.loadMore()
  //     .subscribe(loadMore => this.restaurants = [...this.restaurants, ...loadMore]);
  // }

  // // 텍스트를 지우면 카테고리 컨테이너가 사라짐
  input(value) {
    if (!value.length) { this.showContainer = false; }
  }

  // 버튼을 누르면 카테고리 컨테이너가 사라짐
  // removeCategory() {
  //   this.showContainer = false;
  // }


  // // 레스토랑을 클릭하면 넘어감
  // selectedRestaurant(id: number) {
  //   this.router.navigate(['menu/', id]);
  // }

  // // 운영시간과 현재 시간을 비교해서 내일 몇시에 여는지 표시해주기
  // nextOpenTime(opentime) {
  //   // console.log('opentime', opentime); // opentime 영업시간(배열)을 가져옴
  //   const today = (new Date()).getDay(); // 오늘의 요일
  //   const nextday = today + 1;
  //   const nextdayOpen = opentime.find(function (item) {
  //     return +item.day_of_week === nextday;
  //   });
  //   // console.log('a', nextdayOpen);
  //   // 다음날 배열이 있으면 그배열의 오픈시간을, 그렇지 않으면, 첫 배열의 오픈시간을 가지고 온다.
  //   const nextOpenTime = nextdayOpen ? nextdayOpen.start_time : opentime[0].start_time;
  //   // console.log('nextopen', nextOpenTime);
  //   const nextOpenHour = Math.floor(nextOpenTime / 60);
  //   const nextOpenMin = nextOpenTime % 60;
  //   const AmPm = nextOpenHour >= 12 ? 'PM' : 'AM';
  //   return nextOpenHour + ':' + nextOpenMin + '  ' + AmPm + ' 오픈';
  // }

  // // 현재 시간과 가게 운영시간을 비교해서 true / false
  // checkOpenTimes(item) {
  //   if (item.r_status === 'ACTIVE') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


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
}

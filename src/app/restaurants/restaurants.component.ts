import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hostElement } from '@angular/core/src/render3/instructions';
import { NgModel } from '@angular/forms';

// import { Restaurants } from '../models/restaurant.interface';
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
  restaurants: any;
  categoryLists: any;
  moreLists: any;
  restaurantsList: any;
  value: string;

  constructor(
    public http: HttpClient,
    public el: ElementRef,
    private restaurantService: RestaurantsService,
    public router: Router
  ) {}
  ngOnInit() {
    this.restaurantService.getRestaurants()
      .subscribe(res => {this.restaurantsList = res.restaurants; console.log(this.restaurantsList); }); // 통째로 넘어옴. 정제필요
    this.restaurantService.getCategory()
      .subscribe(res => this.categoryLists = res.categories);
    this.restaurantService.getMoreCategory()
      .subscribe(res => this.moreLists = res.categories);
    this.showContainer = false;
    this.isClick = false;
  }

   // 스크롤을 최상단으로 부드럽게 이동
  goUp() {
    console.log(this.restaurantsList);
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
    this.isClick = !this.isClick;
    this.showContainer = !this.showContainer;
  }

  // 더보기를 누르면 추가적인 레스토랑 리스트가 나온다.
  loadMore() {
    this.restaurantService.loadMore()
      .subscribe(loadMore => this.restaurants = [...this.restaurants, ...loadMore]);
  }

  // 텍스트를 지우면 카테고리 컨테이너가 사라짐
  input(value) {
    if (!value.length) { this.showContainer = false; }
  }

  // 버튼을 누르면 카테고리 컨테이너가 사라짐
  removeCategory() {
    this.showContainer = false;
  }

  // 레스토랑을 클릭하면 넘어감
  selectedRestaurant(id: number) {
    this.router.navigate(['menu/', id]);
  }

  // 운영시간과 현재 시간을 비교해서 내일 몇시에 여는지 표시해주기
  nextOpenTime(opentime) {
    // console.log('opentime', opentime); // opentime 영업시간(배열)을 가져옴
    const today = (new Date()).getDay(); // 오늘의 요일
    const nextday = today + 1;
    const nextdayOpen = opentime.find(function (item) {
      return +item.day_of_week === nextday;
    });
    // console.log('a', nextdayOpen);
    // 다음날 배열이 있으면 그배열의 오픈시간을, 그렇지 않으면, 첫 배열의 오픈시간을 가지고 온다.
    const nextOpenTime = nextdayOpen ? nextdayOpen.start_time : opentime[0].start_time;
    // console.log('nextopen', nextOpenTime);
    const nextOpenHour = Math.floor(nextOpenTime / 60);
    const nextOpenMin = nextOpenTime % 60;
    const AmPm = nextOpenHour >= 12 ? 'PM' : 'AM';
    return nextOpenHour + ':' + nextOpenMin + '  ' + AmPm + ' 오픈';
  }

  // 현재 시간과 가게 운영시간을 비교해서 true / false
  checkOpenTimes(item) {
    if (item.r_status === 'ACTIVE') {
      return true;
    } else {
      return false;
    }
  }

}

import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hostElement } from '@angular/core/src/render3/instructions';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  open: boolean;
  deliveryMin: number;
  foodTypes: string[];
}
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  isShow: boolean; // 스크롤 이동에 따른 버튼의 표시
  showContainer: boolean; // 검색에 값을 넣을 때의 컨테이너 표시
  isClick: boolean; // 검색창에 값을 넣을 때의 표시
  restaurant: Restaurant[];
  open: Restaurant['open']; // 오픈하지 않은 매장의 명도처리

  url = 'http://localhost:3000/restaurants';
  constructor(public http: HttpClient, public el: ElementRef) {
  }

  ngOnInit() {
    this.http.get<Restaurant[]>(this.url)
      .subscribe(restaraunt => this.restaurant = restaraunt);
    this.showContainer = false;
    this.isClick = false;
    }

   // 스크롤을 최상단으로 부드럽게 이동
  goUp() {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    });
  }

   // 스크롤의 위치를 감지해서 스크롤업버튼을 표시
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

    // 클릭하면 placeholder가 변경 / 카테고리 리스트가 변경
  click() {
    this.isClick = !this.isClick;
    this.showContainer = !this.showContainer;
  }
    // 텍스트를 지우면 카테고리 컨테이너가 사라짐
  input() {
    if (event.target.value === 0) {
      this.showContainer = false;
    }
  }
    // 버튼을 누르면 컨테이너가 사라짐
  removeCategory() {
    this.showContainer = false;
  }

  loadMore() {
    console.log('a');
  }
}

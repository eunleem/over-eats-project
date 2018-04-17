import { Injectable } from '@angular/core';
import { Restaurants } from '../models/restaurant.interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Injectable()
export class RestaurantsService {
  // url: string;
  // urls: string;
  // restaurants: Observable<any>;
  // lat: number;
  // lng: number;
  // radius: number;
  // link: string;
  // URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 처음 로드할 때 가지고 올 레스토랑 리스트
  // getRestaurants(): Observable<any> {
  //   // lat과 lng가 지금은 통째로 되어있는데, 이 값을 임의의 값으로 넣어서 보내준다.
  //   // this.urls = 'https://www.overeats.kr/api/restaurant/?lat=37.494760&lng=127.051284&radius=5000';
  //   this.url = 'https://www.overeats.kr/api/restaurant/?';
  //   this.lat = 37.494760;
  //   this.lng = 127.051284;
  //   this.radius = 5000;
  //   this.link = (this.url + 'lat=' + this.lat + '&lng=' + this.lng + '&radius=' + this.radius);
  //   return this.http.get<any>(this.link);
  // }

  // get category
  getCategory(): Observable<any> {
    // console.log('get category');
    return this.http.get<any>('https://www.overeats.kr/api/restaurant/category/?page_size=10');
  }

  // get moreCategory
  getMoreCategory(): Observable<any> {
    return this.http.get<any>('../../assets/db.json');
  } // moreCategory

  // 더 로드하기 버튼을 누르면 데이터를 가지고 와서 기존의 리스트에 더해준다.
  loadMore(): Observable<any> {
      return this.http.get<any>('../../assets/db.json');
  } // loadMore

}

import { Injectable } from '@angular/core';
import { Restaurants } from '../models/restaurant.interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Injectable()
export class RestaurantsService {
  restaurants: Observable<Restaurants[]>;
  constructor(private http: HttpClient) {}

  // 처음 로드할 때 가지고 올 레스토랑 리스트
  getRestaurants(): Observable<Restaurants[]> {
    return this.http.get<Restaurants[]>('../../assets/db.json');
  }

  // 상위 카테고리
  getCategory(): Observable<Restaurants[]> {
    return this.http.get<Restaurants[]>('../../assets/db.json');
  } // category

  // 더 많은 카테고리 목록
  getMoreCategory(): Observable<Restaurants[]> {
    return this.http.get<Restaurants[]>('../../assets/db.json');
  } // moreCategory

  // 더 로드하기 버튼을 누르면 데이터를 가지고 와서 기존의 리스트에 더해준다.
  loadMore(): Observable<Restaurants[]> {
      return this.http.get<Restaurants[]>('../../assets/db.json');
  } // loadMore

}

import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestaurantsService {
  restaurants: Observable<Restaurant[]>;
  constructor(private http: HttpClient) {}

  // 처음 로드할 때 가지고 올 레스토랑 리스트
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('../../assets/db.json');
  }

  // 상위 카테고리
  getCategory(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('../../assets/db.json');
  } // category

  // 더 많은 카테고리 목록
  getMoreCategory(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('../../assets/db.json');
  } // moreCategory

  // 더 로드하기 버튼을 누르면 데이터를 가지고 와서 기존의 리스트에 더해준다.
  // 단, 리스트가 더이상 없다면 추가하지 않는다.
  loadMore(): Observable<Restaurant[]> {
      return this.http.get<Restaurant[]>('../../assets/db.json');
  } // loadMore

}

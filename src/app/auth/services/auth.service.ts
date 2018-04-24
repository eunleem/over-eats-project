import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../../environments/environment';

import { User } from '../user';
import { Token } from '../token';


@Injectable()
export class AuthService {
  // TODO: 주소 바꿔줄것.
  URL = environment.apiUrl;
  TOKEN_NAME = environment.tokenName;
  USER = 'user';

  result: any;
  thisUser: any;
  subscriber = new Array<Observer<User>>();
  subscriptionObservable: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
  }



  // TODO ** set User 부분 ** 변경하기!!!!!!!
  signin(credential): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/login/`, credential)
      .do(res => this.setToken(res.token))
      .do(res => this.setUser(res.user))
      .shareReplay();
  }

  signup(credential): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/member/user/`, credential);
  }


  signout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }


  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  // 로컬에 있는 유저 정보 가져오기
  getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER));
  }

  // 서버에 있는 유저 정보 가지고 오기
  // getUserFromServer() {
  //   const user = JSON.parse(localStorage.getItem(this.USER));
  //   const token = this.getToken();
  //   const headers = new HttpHeaders({
  //     'Authorization': `token ${token}`
  //   });
  //   return this.http.get<any>(`${this.URL}/member/user/${user.pk}`, {headers: headers} )
  // }


  getUserFromServer(token, pk) {
    const tokenstr = `token ${token}`;
    return this.http.get<any>(`${this.URL}/member/user/${pk}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tokenstr
      })
    });
  }

  setUser(user: any): void {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.USER);
  }


  updateUser(user, pk, token) {
    const tokenstr = `token ${token}`;
    return this.http.put<User>(`${this.URL}/member/user/${pk}`, {user} , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tokenstr
      })
    });
  }

}

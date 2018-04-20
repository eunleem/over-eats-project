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

  // getUser(): Observable<User> {
  //   const thisUser = localStorage.getItem(this.USER);
  //   return
  // }

  getUser(): User {
    const user = JSON.parse(localStorage.getItem(this.USER));
    return user;
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
    return this.http.put<Token>(`${this.URL}/member/user/${pk}`, user , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tokenstr
      })
    });
  }

}

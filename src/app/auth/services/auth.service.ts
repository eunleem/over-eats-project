import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import { JwtHelper } from 'angular2-jwt';

import { User } from '../user';
import { Token } from '../token';


import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  URL = `${environment.apiUrl}/auth`;
  TOKEN_NAME = environment.tokenName;
  userId: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) { }

  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/signin`, credential)
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  signout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  // 토큰으로부터 사용자 아이디 취득
  getUserid(): string {
    // console.log(this.getDecodeToken());
    return this.getDecodeToken().userid;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  // token 유효 기간 체크
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  // 토큰으로부터 사용자 정보 취득
  getDecodeToken() {
    return this.jwtHelper.decodeToken(this.getToken());
  }
}

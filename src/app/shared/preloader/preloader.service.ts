import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderService {

  public isShow = false;

  constructor() { }

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }
}

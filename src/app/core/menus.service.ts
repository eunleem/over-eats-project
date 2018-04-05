import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Menu } from '../models/menu.interface';

import { MenuData } from '../menu-list/menu.data';

@Injectable()
export class MenusService {
  items: Menu[];

  constructor() { }

  getMenus() {
    this.items = new MenuData().items;
  }
}

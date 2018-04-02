import { Component } from '@angular/core';

import { HeaderComponent } from './shared/header/header.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-restaurants></app-restaurants>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsComponent } from './restaurants.component';

import { RestaurantRoutingModule } from './restaurants-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule
  ],
  declarations: [
    RestaurantsComponent
  ],
  exports: [
    RestaurantsComponent
  ]
})
export class RestaurantsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsComponent } from './restaurants.component';

import { RestaurantRoutingModule } from './restaurants-routing.module';
import { FormsModule } from '@angular/forms';
import { RestaurantsService } from '../core/restaurants.service';

@NgModule({
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule
  ],
  declarations: [
    RestaurantsComponent,
  ],
  exports: [
    RestaurantsComponent
  ],
  providers: [RestaurantsService]
})
export class RestaurantsModule { }

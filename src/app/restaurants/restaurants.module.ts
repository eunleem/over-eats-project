import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsComponent } from './restaurants.component';

import { RestaurantRoutingModule } from './restaurants-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    RestaurantsComponent,
  ],
  exports: [
    RestaurantsComponent
  ],
  providers: []
})
export class RestaurantsModule { }

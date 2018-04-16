import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsComponent } from './restaurants.component';

import { RestaurantRoutingModule } from './restaurants-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot()
  ],
  declarations: [
    RestaurantsComponent
  ],
  exports: [
    RestaurantsComponent
  ],
  providers: []
})
export class RestaurantsModule { }

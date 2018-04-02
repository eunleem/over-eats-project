import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './restaurants.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RestaurantsComponent
  ],
  exports: [
    RestaurantsComponent
  ]
})
export class RestaurantsModule { }

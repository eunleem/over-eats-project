import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsComponent } from './restaurants.component';
import { HomeComponent } from '../home/home.component';
import { MenuListComponent } from '../menu-list/menu-list.component';


const routes: Routes = [
  { path: 'restaurants/:lat/:lng', component: RestaurantsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }

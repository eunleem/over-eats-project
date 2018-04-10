import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsComponent } from './restaurants.component';
import { HomeComponent } from '../home/home.component';
import { MenuListComponent } from '../menu-list/menu-list.component';


const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent },
  // { path: 'menu-list/:id', component: MenuListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';
import { CartComponent } from './cart/cart.component';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  declarations: [
    MenuListComponent,
    CartComponent
  ],
  exports: [
    CartComponent
  ]
})
export class MenuListModule { }

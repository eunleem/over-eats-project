import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';

import { MenuRoutingModule } from './menu-routing.module';
import { CartModule } from '../cart/cart.module';
import { SelectorModule } from '../cart/selector/selector.module';



@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    CartModule,
    SelectorModule
  ],
  declarations: [
    MenuListComponent
  ],
  exports: [],
  providers: []
})
export class MenuListModule { }

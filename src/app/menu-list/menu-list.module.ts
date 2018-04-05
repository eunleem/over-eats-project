import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';

import { MenuRoutingModule } from './menu-routing.module';
import { CartModule } from '../cart/cart.module';
import { SelectorModule } from './selector/selector.module';


@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    CartModule,
    SelectorModule
  ],
  declarations: [
    MenuListComponent,
  ],
  exports: [
  ]
})
export class MenuListModule { }

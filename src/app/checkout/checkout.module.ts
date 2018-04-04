import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { MenuListModule } from '../menu-list/menu-list.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MenuListModule
  ],
  declarations: [
    CheckoutComponent
  ]
})
export class CheckoutModule { }

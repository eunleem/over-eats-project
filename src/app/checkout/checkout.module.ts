import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CartModule } from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CartModule
  ],
  declarations: [
    CheckoutComponent
  ]
})
export class CheckoutModule { }

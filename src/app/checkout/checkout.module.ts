import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MomentModule } from 'angular2-moment';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CartModule } from '../cart/cart.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MomentModule,
    CheckoutRoutingModule,
    CartModule
  ],
  declarations: [
    CheckoutComponent,
  ]
})
export class CheckoutModule { }

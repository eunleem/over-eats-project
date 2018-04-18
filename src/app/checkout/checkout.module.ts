import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CartModule } from '../cart/cart.module';
import { PipeModule } from '../pipe/pipe.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    CartModule,
    FormsModule,
    TextMaskModule,
    MomentModule,
    PipeModule
  ],
  declarations: [
    CheckoutComponent,
  ]
})
export class CheckoutModule { }

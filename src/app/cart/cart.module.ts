import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { SelectorModule } from '../menu-list/selector/selector.module';
import { CartService } from '../core/cart.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectorModule
  ],
  declarations: [ CartComponent ],
  exports: [CartComponent],
  providers: [CartService]
})
export class CartModule { }

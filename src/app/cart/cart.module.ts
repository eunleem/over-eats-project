import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { SelectorModule } from '../menu-list/selector/selector.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectorModule
  ],
  declarations: [ CartComponent ],
  exports: [CartComponent]
})
export class CartModule { }

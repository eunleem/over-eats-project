import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../core/cart.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SelectorComponent],
  exports: [SelectorComponent],
  providers: [CartService]
})
export class SelectorModule { }

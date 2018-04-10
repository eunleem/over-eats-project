import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';

import { CartService } from '../core/cart.service';
import { SelectorComponent } from './selector/selector.component';
import { SelectorModule } from './selector/selector.module';
import { EditorModule } from './editor/editor.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SelectorModule,
    EditorModule
  ],
  declarations: [
    CartComponent
  ],
  exports: [
    CartComponent
  ],
  providers: [CartService]
})
export class CartModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModalComponent } from './select-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';
import { SelectorComponent } from '../../cart/selector/selector.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SelectModalComponent, CounterComponent],
  exports: [SelectorComponent, CounterComponent]
})
export class SelectModalModule { }

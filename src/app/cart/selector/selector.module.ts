import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule.forRoot()
  ],
  declarations: [SelectorComponent],
  exports: [SelectorComponent]
})
export class SelectorModule { }

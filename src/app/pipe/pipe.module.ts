import { NgModule } from '@angular/core';
import { KoreanPipe } from './korean.pipe';
import { OrderFilterPipe } from './order-filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    KoreanPipe,
    OrderFilterPipe
  ],
  exports: [
    KoreanPipe,
    OrderFilterPipe
  ]
})
export class PipeModule {

  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}

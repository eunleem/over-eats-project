import { NgModule } from '@angular/core';
import { KoreanPipe } from './korean.pipe';

@NgModule({
  imports: [],
  declarations: [
    KoreanPipe
  ],
  exports: [
    KoreanPipe
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

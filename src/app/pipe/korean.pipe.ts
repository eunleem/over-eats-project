import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'korean'
})
export class KoreanPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.replace(/[a-zA-Z].*/g, '');
    return value;
  }
}

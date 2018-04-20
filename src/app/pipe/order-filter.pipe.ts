import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any[], status?: string): any {
    if (!value) {
      return;
    }
    return value.filter(({order_status}) => {
      switch (status) {
        case '준비중': return order_status === '준비중';
        case '완료' : return order_status === '완료';
        case '주문취소' : return order_status === '주문취소';
        default: return true;
      }
    });
  }

}

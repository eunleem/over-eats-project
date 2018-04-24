import { Component, OnInit } from '@angular/core';
import { SearchService } from '../core/search.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  token: string;
  prepareOrderList;
  pastOrderList;
  orderList;

  list: {};
  hide = true;
  navItems = ['전체', '준비중', '주문취소', '완료'];
  selectedNavItem = '전체';

  constructor(
    private searchService: SearchService,
    private auth: AuthService
  ) {
    this.token = this.auth.getToken();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.getLists();
    }
  }

  setCurrentNavItem(selectedNavItem) {
    this.selectedNavItem = selectedNavItem;
  }

  getLists() {
    this.searchService.getAllOrder(this.token)
      .subscribe(data => {
        this.orderList = data;
        console.log('prepare', data);
      },
        (err) => console.log('error occured'));
    // this.searchService.getPastOrder(this.token)
    //   .subscribe(data => {
    //     this.pastOrderList = data;
    //     console.log('past', data);
    //   });
  }

  showDetail(list) {
    this.list = list;
    this.hide = false;
    console.log('show order', list);
  }

  cancelOrder(id) {
    console.log(id);
    const token = this.auth.getToken();
    this.searchService.cancelOrder(token, id)
      .subscribe(data => {
        console.log(data);
        this.getLists();
      });
  }

}

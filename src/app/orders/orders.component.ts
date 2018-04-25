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
  interval;
  selectedStatus: string;

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
      },
        (err) => console.log('error occured'));
  }

  // getStatus(token) {
  //   this.interval = setInterval(() => {
  //     console.log(this.selectedStatus);
  //     this.searchService.getAllOrder(this.token)
  //       .filter(data => data.orderList.orders)
  //       .subscribe(data => this.selectedStatus);
  //   }, 3000);
  // }

  showDetail(list) {
    this.list = list;
    this.hide = false;
  }

  cancelOrder(id) {
    console.log(id);
    const token = this.auth.getToken();
    this.searchService.cancelOrder(token, id)
      .subscribe(data => {
        this.getLists();
      });
  }

}

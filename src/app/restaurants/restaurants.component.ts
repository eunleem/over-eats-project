import { Component, OnInit } from '@angular/core';

interface Restaurant {
  id: number;
  name: string;
  tag: string;
}
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  // template: `test`,
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaraunt: Restaurant[];
  constructor() { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.restaraunt = [
      { id: 1, name: 'mcDonald', tag: 'burger'} ,
      { id: 2, name: 'burgerking', tag: 'burger'} ,
      { id: 3, name: 'lotteria', tag: 'burger'} ,
    ];
  }

  goUp() {
    window.scrollTo(0, 0);
  }

  loadMore() {
    console.log(this.restaraunt);
  }

}

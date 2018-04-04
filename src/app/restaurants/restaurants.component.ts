import { Component, OnInit } from '@angular/core';

interface Restaurant {
  id: number;
  name: string;
  tag: string;
  time: string;
}
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
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
      { id: 1, name: 'mcDonald', tag: 'burger', time: '10~15'},
      { id: 2, name: 'burgerking', tag: 'potato', time: '10~15'},
      { id: 3, name: 'lotteria', tag: 'burger', time: '10~15'},
      { id: 4, name: 'momskitchin', tag: 'burger', time: '10~15'},
      { id: 5, name: 'starbucks', tag: 'coffee', time: '15~20' },
      { id: 6, name: 'coffeebean', tag: 'coffee', time: '10~15' },
      { id: 7, name: 'caffebene', tag: 'coffee', time: '10~15' },
      { id: 8, name: 'sandwich', tag: 'sandwich', time: '10~15' },
      { id: 9, name: 'JOEsandwich', tag: 'sandwich', time: '10~15' },
      { id: 10, name: 'KIMs sandwich', tag: 'sandwich', time: '10~15' },
    ];
  }

  goUp() {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    });
  }

  loadMore(event) {
    // const goUp = document.querySelector('go-up');
    // const Height = document.querySelector('.content-list');
    console.log('a');
  }

}

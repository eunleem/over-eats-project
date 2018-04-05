import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  open: boolean;
  deliveryMin: number;
  foodTypes: string[];
}
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaraunt: Restaurant[];
  open: Restaurant['open'];
  url = 'http://localhost:3000/restaurants';
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get<Restaurant[]>(this.url)
      .subscribe(restaraunt => this.restaraunt = restaraunt);
    }


  goUp() {
    console.log();
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0
    });
  }

  loadMore() {
    console.log('a');
  }
  move(id: number) {
    console.log(id);
    console.log(this.restaraunt[id].open);
    // const a = this.restaraunt[4] ? id : 'false';
    // console.log(a);
  }

  storeOpen(id: number) {
    const a = this.restaraunt[id].open ? 'true' : 'false';
    console.log(a);
  }
  
}

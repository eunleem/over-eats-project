import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../core/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from '../core/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  onMain = true;
  lat: string;
  lng: string;
  constructor(
    private http: HttpClient,
    public router: Router,
    private searchService: SearchService
    // private cartService: CartService
  ) { }

  ngOnInit() {
    // this.cartService.emptyCart();
  }


  getLocation(location: string) {
    // this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json', {
    //   params: {
    //     address: location,
    //     key: 'AIzaSyCWNHncRx3LgQURlXOHMkN_vbpQxZGqISU'
    //   }
    // })
    this.searchService.searchAddress(location)
      .subscribe((res) => {
        const { lat, lng } = res.result[0].geometry;
        this.searchService.saveAddress(res.result[0]);
        this.router.navigate(['/restaurants', `${lat}`, `${lng}`]);
        }
      );
  }

  ngOnDestroy() {
  }
}

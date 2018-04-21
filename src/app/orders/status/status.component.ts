import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SearchService } from '../../core/search.service';
import { AuthService } from '../../auth/services/auth.service';


interface Imarker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon?: string;
}
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  // google maps zoom level
  zoom = 16;
  token;
  orderList;
  geometry;
  deliveryGeometry;
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  markers: Imarker[];

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Imarker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  constructor(
    private searchService: SearchService,
    private auth: AuthService
  ) {
    this.token = this.auth.getToken();
  }

  // TODOS url fix, activate route으로 현재 param (id)받아서 데이터 가져오기.
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.searchService.getPrepareOrder(this.token)
        .subscribe(data => {
          this.geometry = data.orders[0].order_restaurant.position;
          this.deliveryGeometry = {
            lat: data.orders[0].delivery_lat, lng: data.orders[0].delivery_lng
          };
          this.setMarker(this.geometry, this.deliveryGeometry);
          console.log(this.geometry, this.deliveryGeometry);
        },
          (err) => console.log('error occured'));
    }
  }


  setMarker(geometry, deliveryGeometry) {
    this.markers = [
      {
        lat: geometry.latitude,
        lng: geometry.longtitude,
        label: '출발지',
        draggable: true,
        icon: '../../../assets/images/custom_marker.png'
      },
      {
        lat: deliveryGeometry.lat,
        lng: deliveryGeometry.lng,
        label: '도착지',
        draggable: false,
        icon: '../../../assets/images/green_marker.png'
      }
    ];

  }
}

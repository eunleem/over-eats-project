import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SearchService } from '../../core/search.service';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';


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
  token: string;
  id: string;
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
    private auth: AuthService,
    private activateRoute: ActivatedRoute
  ) {
    this.token = this.auth.getToken();
  }

  ngOnInit() {
    this.activateRoute
      .params.subscribe(params => {
        this.id = params.id;
        this.searchService.getOrderByID(this.token, params.id)
          .subscribe(data => {
            console.log(data);
            this.geometry = data.order_restaurant.position;
            this.deliveryGeometry = {
              lat: data.delivery_lat, lng: data.delivery_lng
            };
            this.setMarker(this.geometry, this.deliveryGeometry);
            console.log(this.geometry, this.deliveryGeometry);
          });
    });
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

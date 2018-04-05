import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  onMenu = false;
  isCart = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationStart) {
        if (data.url !== '/home') {
          this.onMenu = true;
        } else {
          this.onMenu = false;
        }
      }
    });
  }

  ngOnInit() {
    // console.log(this.route.snapshot.params.id);
  }

}

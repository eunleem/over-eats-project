import { Component, OnInit, Input } from '@angular/core';
import { PreloaderService } from './preloader.service';

@Component({
  selector: 'app-preloader',
  styleUrls: ['./preloader.component.scss'],
  template: `
  <div class="showbox" [ngClass]="{'onHeader': onMenu, 'onMain': !onMenu, 'onPage': onPage}">
    <div class="loader">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
      </svg>
    </div>
  </div>
  `
})
export class PreloaderComponent implements OnInit {
  @Input()
  onMenu: boolean;

  @Input()
  onPage: boolean;

  constructor(public preloader: PreloaderService) { }

  ngOnInit() { }

}

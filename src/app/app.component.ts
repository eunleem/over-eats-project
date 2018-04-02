import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <div class="wrapper">
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  </div>
  `
})
export class AppComponent {
  title = 'app';
}

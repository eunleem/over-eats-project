import { Component } from '@angular/core';

import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';
}

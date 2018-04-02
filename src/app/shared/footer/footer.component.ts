import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      <div class="constraint footer-content">
      this is footer
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

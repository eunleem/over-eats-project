import { Component, OnInit } from '@angular/core';
interface List {
  id: number;
  name: string;
  github: string;
}
@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      <div class="constraint footer-content">
        <div class="name">Participants</div>
        <div class="participants-container">
          <div>
            <li class="learn">IOS</li>
            <a href="https://github.com/wargi"><li>SangWook Park</li></a>
            <a href="https://github.com/solchan87"><li>Solchan Ahn</li></a>
            <a href="https://github.com/baeraemo"><li>TaeWoong Bae</li></a>
          </div>
          <div>
            <li class="learn">WDS</li>
            <a href="https://github.com/archomai"><li>archomai</li></a>
            <a href="https://github.com/callorange"><li>callorange</li></a>
          </div>
          <div>
            <li class="learn">FDS</li>
            <a href="https://github.com/yogicat"><li>Dahe Oh</li></a>
            <a href="https://github.com/bluelion2"><li>Seunghun Kang</li></a>
          </div>
        </div>
        <div class="foot">
          <a href="https://github.com/FastCampusTeamTwo"><span>OverEats Project</span></a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit() {}

}

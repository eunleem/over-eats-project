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
  list: List[];
  url: string;
  constructor() { }

  ngOnInit() {
    this.list = [
      // { id: 0, name: 'IOS', github: 'https://github.com/wargi' },
      // { id: 1, name: 'SangWook Park', github: 'https://github.com/wargi' },
      // { id: 2, name: 'Solchan Ahn', github: 'https://github.com/solchan87' },
      // { id: 3, name: 'TaeWoong Bae', github: 'https://github.com/baeraemo' },
      // { id: 4, name: 'WDS', github: 'https://github.com/baeraemo' },
      // { id: 5, name: 'archomai ', github: 'https://github.com/archomai' },
      // { id: 6, name: 'callorange', github: 'https://github.com/callorange' },
      // { id: 7, name: '', github: 'https://github.com/callorange' },
      // { id: 8, name: 'FDS', github: 'https://github.com/callorange' },
      // { id: 9, name: 'Dahe Oh', github: 'https://github.com/yogicat' },
      // { id: 10, name: 'Seunghun Kang', github: 'https://github.com/bluelion2' },
      // { id: 11, name: '', github: 'https://github.com/baeraemo' },
    ];
    // this.url = 'https://github.com/FastCampusTeamTwo';
  }


}

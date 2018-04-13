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
            <a href="https://github.com/wargi"><li>Sangwook Park</li></a>
            <a href="https://github.com/solchan87"><li>Solchan Ahn</li></a>
            <a href="https://github.com/baeraemo"><li>Taewoong Bae</li></a>
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
        <div class="news constraint">
          <h3>패스트캠퍼스의 뉴스레터를 구독하시면, 간편하게 신규 교육과정 및 이벤트/세미나 소식을 메일로 받아보실 수 있습니다!</h3>
          <div><input type="email" placeholder="E-mail Address"></div>
          <div><button>Subscribe</button></div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit() {}

}

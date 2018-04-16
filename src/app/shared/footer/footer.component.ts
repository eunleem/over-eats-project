import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      <div class="constraint footer-content">
        <div class="name">Product</div>
        <div class="participants-container">
          <div>
            <li class="learn">IOS</li>
            <a href="https://github.com/wargi"><li>Sangwook Park</li></a>
            <a href="https://github.com/solchan87"><li>Solchan Ahn</li></a>
            <a href="https://github.com/baeraemo"><li>Taewoong Bae</li></a>
          </div>
          <div>
            <li class="learn">FDS</li>
            <a href="https://github.com/yogicat"><li>Dahe Oh</li></a>
            <a href="https://github.com/bluelion2"><li>Seunghun Kang</li></a>
          </div>
          <div>
            <li class="learn">WDS</li>
            <a href="https://github.com/archomai"><li>Seungri Cho</li></a>
            <a href="https://github.com/callorange"><li>JeongYeob Song</li></a>
          </div>
        </div>
        <div class="news constraint">
          <h3>패스트캠퍼스의 뉴스레터를 구독하시면, 간편하게 신규 교육과정 및 이벤트/세미나 소식을 메일로 받아보실 수 있습니다!</h3>
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()" novalidate>
            <div class="formGroup">
              <input type="text" name="Email" formControlName="Email" placeholder="E-mail Address">
              <em *ngIf="Email.errors?.required && Email.touched" class="alert">이메일을 입력하세요.</em>
              <em *ngIf="Email.errors?.pattern && Email.touched" class="alert">이메일 형식을 지켜주세요</em>
            </div>
            <div>
              <button type="submit" [disabled]="userForm.invalid">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit {
  userForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ])
    });
  }

  get Email() {
    return this.userForm.get('Email');
  }

  onSubmit() {
    alert('전송이 완료 되었습니다.');
    this.userForm.reset();
  }

}

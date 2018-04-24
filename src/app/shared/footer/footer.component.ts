import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      <div class="constraint footer-content">
        <div class="participants-container">
          <div class="footer-title">
            OverEats
          </div>
          <div>
            <ul>
              <li class="learn">OverEats</li>
              <li><a href="https://github.com/FastCampusTeamTwo">Github</a></li>
              <li>about</li>
              <li>blog</li>
              <li>press</li>
            </ul>
          </div>
          <div>
            <ul>
              <li class="learn">Frontend</li>
              <li><a href="https://github.com/yogicat">Dahe Oh</a></li>
              <li><a href="https://github.com/bluelion2">Seunghun Kang</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li class="learn">Backend</li>
              <li><a href="https://github.com/archomai">Seungri Cho</a></li>
              <li><a href="https://github.com/callorange">Jeongyeob Song</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li class="learn">Follow us</li>
              <li>instagram</li>
              <li>twitter</li>
              <li>snapchat</li>
              <li>facebook</li>
            </ul>
          </div>
        </div>
        <div class="news constraint">
          <h3>궁금하신 점이 있다면 이메일을 보내주세요!</h3>
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()" novalidate>
            <div class="formGroup">
              <input type="text" name="Email" formControlName="Email" placeholder="E-mail Address">
              <em *ngIf="!!Email.errors?.required && Email.touched" class="alert">이메일을 입력하세요.</em>
              <em *ngIf="!!Email.errors?.pattern && Email.touched" class="alert">이메일 형식을 지켜주세요</em>
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

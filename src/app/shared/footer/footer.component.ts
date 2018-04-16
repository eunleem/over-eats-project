import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer>
      <div class="constraint footer-content">
        <div class="name">Participants</div>
        <div class="participants-container">
          <div>
            <ul>
              <li class="learn">OverEats</li>
              <a href="https://github.com/FastCampusTeamTwo"><li>Project</li></a>
            </ul>
          </div>
          <div>
            <ul>
              <li class="learn">Frontend</li>
              <a href="https://github.com/yogicat"><li>Dahe Oh</li></a>
              <a href="https://github.com/bluelion2"><li>Seunghun Kang</li></a>
            </ul>
          </div>
          <div>
            <ul>
              <li class="learn">Backend </li>
              <a href="https://github.com/archomai"><li>Seungri Cho</li></a>
              <a href="https://github.com/callorange"><li>JeongYeob Song</li></a>
            </ul>
          </div>
        </div>
        <div class="news constraint">
          <h3>궁금하신 점이 있다면 이메일을 보내주세요!</h3>
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

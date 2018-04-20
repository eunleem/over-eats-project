import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  template: `
  <div class="background" *ngIf="!hide">
    <div class="detail">
      hello I am detail
      <button
        class="button uber"
        (click)="hide = true">닫기</button>
    </div>
  </div>
  `,
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() detailList: any;
  hide: boolean;
  constructor() { }

  ngOnInit() {
  }

}

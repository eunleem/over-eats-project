import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-select-modal',
  styleUrls: ['./select-modal.component.scss'],
  template: `
  <div
      class="modal-background">
      <div class="modal">
        <button class="closeButton" (click)="toggle()">
          <svg viewBox="0 0 64 64" width="16px" height="16px" class="closeButtonBase_ b4 bw a7z u8 kz l0 a80 a81 a82 a83 a84 closeButtonLight_ a3 ds">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.828 32l18.385 18.385-2.828 2.828L32 34.83 13.615 53.213l-2.828-2.828L29.172 32 10.787 13.616l2.828-2.829L32 29.172l18.385-18.385 2.828 2.829L34.828 32z">
            </path>
          </svg>
        </button>
        <ng-content select="h3"></ng-content>
        <ng-content select="p"></ng-content>
        <div class="formgroup">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <label>조리시 요청사항
            <input
              type="text"
              formControlName="comments"
              class="comment"
              placeholder="음식 조리시 요청사항을 적어주세요">
            </label>
            <app-counter
              [step]="1"
              [min]="0"
              [max]="20"
              formControlName="quantity">
            </app-counter>
            <ng-content
              select="button">
            </ng-content>
          </form>
        </div>
    </div>
  </div>
  `
})
export class SelectModalComponent implements OnInit {
  @Output() submitted = new EventEmitter<FormGroup>();
  @Output() close = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
      comments: '',
      quantity: 0
    });
  }

  toggle() {
    this.close.emit(null);
  }

  onSubmit() {
    console.log('onsubmit' , this.form.value);
    this.submitted.emit(this.form);
  }

}

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  showCalendar = false;
  today = Date.now();
  myDate = new Date();
  days: [0, 1, 2, 3, 4, 5, 6];
  form = this.fb.group({
    date: '',
    time: ''
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}

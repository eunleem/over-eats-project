import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  showCalendar = false;
  myDate = Date.now();
  days: [0, 1, 2, 3, 4, 5, 6];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      time: '',
      address1: ['', Validators.required],
      address2: '',
      comments: ''
    });

    this.form.valueChanges
      .filter(data => this.form.valid)
      .subscribe(data => console.log(JSON.stringify(data)));
  }

  ngOnInit() {
  }

}

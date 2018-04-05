import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Menu } from '../models/menu.interface';

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  template: `
  <div class="cart">
    cart
    <pre>{{ cart | json }}</pre>
  </div>
  `
})
export class CartComponent implements OnInit {
  @Input() cart: any;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }



}

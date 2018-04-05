import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  onMenu: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.onMenu);
  }
  onEnter() {
    this.router.navigate(['menu']);
  }
}

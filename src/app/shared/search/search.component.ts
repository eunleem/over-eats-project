import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
  }
  onEnter() {
    this.router.navigate(['/menu', 123]);
  }

}

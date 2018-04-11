import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  styleUrls: ['./category.component.scss'],
  template: `
  <section *ngIf="showContainer">
        <div class="category-container" >
          <h1 class="categorys">상위 카테고리</h1>
          <div class="category-list">
            <div class="category"
              *ngFor="let list of restaurant">
              <a (click)="selectedRestaurant(list)">
                <img class="category-image"
                src="{{list.image}}">
              </a>
            </div>
          </div>
        </div>
        <div class="more-category-container">
          <h1 class="categorys">더 많은 카테고리</h1>
          <div class="more-category-list">
            <div class="more-category"
              *ngFor="let moreList of moreLists">
              <a (click)="selectedRestaurant(moreList)">
                <img class="more-category-image"
                  src="{{moreList.image}}"
                  alt="moreListImage">
              </a>
            </div>
          </div>
        </div>
      </section>
  `
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

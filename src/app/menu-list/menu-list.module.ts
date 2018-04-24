import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';

import { MenuRoutingModule } from './menu-routing.module';
import { CartModule } from '../cart/cart.module';
import { SelectorModule } from '../cart/selector/selector.module';
import { SharedModule } from '../auth/shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import { ScrollToModule } from '../directives/scrollTo';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    CartModule,
    SelectorModule,
    SharedModule,
    PipeModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  declarations: [
    MenuListComponent,
  ],
  exports: [],
  providers: []
})
export class MenuListModule { }

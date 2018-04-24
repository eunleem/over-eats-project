import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { StatusComponent } from './status/status.component';
import { PipeModule } from '../pipe/pipe.module';
import { MomentModule } from 'ngx-moment';
import { AgmCoreModule } from '@agm/core';
import { DetailComponent } from './detail/detail.component';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PipeModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNB8ZRuDznOg8uoMyn1nqkCqIWneUup5A',
    }),
    AgmDirectionModule
  ],
  declarations: [
    OrdersComponent,
    StatusComponent,
    DetailComponent
  ]
})
export class OrdersModule { }

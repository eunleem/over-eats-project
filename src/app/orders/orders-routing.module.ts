import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { StatusComponent } from './status/status.component';



const routes: Routes = [
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'status/:id', component: StatusComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

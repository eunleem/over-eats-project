import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', redirectTo: 'home' },
  { path: 'login', redirectTo: 'login' },
  { path: 'signup', redirectTo: 'signup' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

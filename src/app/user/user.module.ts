import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }

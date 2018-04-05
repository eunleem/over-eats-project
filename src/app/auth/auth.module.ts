import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { JwtHelper } from 'angular2-jwt';
// import { AuthService } from './services/auth.service';
// import { AuthGuard } from './services/auth.guard';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  declarations: []
})
export class AuthModule { }

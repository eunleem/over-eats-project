import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// custom module
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

// routing module
import { AppRoutingModule } from './app-routing.module';

// custom component
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuListModule } from './menu-list/menu-list.module';
import { CheckoutModule } from './checkout/checkout.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // default module
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // custom module
    HomeModule,
    SharedModule,
    UserModule,
    RestaurantsModule,
    AuthModule,
    MenuListModule,
    CheckoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { CartModule } from './cart/cart.module';

// Services
import { CartService } from './core/cart.service';
import { AuthService } from './auth/services/auth.service';
import { SearchService } from './core/search.service';
import { AuthGuard } from './auth/services/auth.guard';

@NgModule({
  declarations: [
    AppComponent
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
    CheckoutModule,
    CartModule,
  ],
  providers: [
    CartService,
    AuthService,
    AuthGuard,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

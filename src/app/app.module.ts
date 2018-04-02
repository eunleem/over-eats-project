import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// custom module
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

// routing module
import { AppRoutingModule } from './app-routing.module';

// custom component
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RestaurantsModule } from './restaurants/restaurants.module';


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
    RestaurantsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

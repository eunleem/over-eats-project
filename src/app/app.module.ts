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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

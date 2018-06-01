import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app-router/app-router.module';


import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SeasonModule } from './season/season.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    HomeModule,
    SeasonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

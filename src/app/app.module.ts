import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { ThemeService } from './theme.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CountriesService } from './countries.service';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    NotFoundComponent,
    NavbarComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule,
    HttpClientModule,
    NgOptimizedImage,
  ],
  providers: [ThemeService, CountriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}

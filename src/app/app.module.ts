import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './services/country.service';
import { CountryListComponent } from './components/country-list/country-list.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, CountryListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [CountryService],
  bootstrap: [AppComponent],
})
export class AppModule {}

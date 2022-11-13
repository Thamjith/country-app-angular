import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './services/country.service';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContinentsComponent } from './components/continents/continents.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CountryComponent } from './components/country/country.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FavouriteCountriesComponent } from './components/favourite-countries/favourite-countries.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent,
    RegistrationComponent,
    ContinentsComponent,
    SidemenuComponent,
    LayoutComponent,
    CountryComponent,
    EditProfileComponent,
    FavouriteCountriesComponent,
    AlertModalComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [CountryService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContinentsComponent } from './components/continents/continents.component';
import { CountryComponent } from './components/country/country.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FavouriteCountriesComponent } from './components/favourite-countries/favourite-countries.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'continents/:slug',
    canActivate: [AuthGuard],
    component: ContinentsComponent,
  },
  {
    path: 'country/view/:id',
    canActivate: [AuthGuard],
    component: CountryComponent,
  },
  {
    path: 'favourite-countries',
    canActivate: [AuthGuard],
    component: FavouriteCountriesComponent,
  },
  {
    path: 'edit-profile',
    canActivate: [AuthGuard],
    component: EditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

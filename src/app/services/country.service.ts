import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl =
    'https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson';

  constructor(
    private httpClient: HttpClient,
    private login: AuthenticationService
  ) {}

  getCountryList(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl);
    // .pipe(map((response) => response._embedded.products));
  }

  getNewFavouriteCountriesId() {
    const oldrecords = localStorage.getItem('favouriteCountriesList');
    if (oldrecords !== null) {
      const userList = JSON.parse(oldrecords);
      return userList.length + 1;
    } else {
      return 1;
    }
  }

  public add_favourite_list(country: any) {
    const oldrecords = localStorage.getItem('favouriteCountriesList');
    if (oldrecords !== null) {
      const favouriteArr = JSON.parse(oldrecords);
      const favouriteData = {
        id: this.getNewFavouriteCountriesId(),
        user_id: this.login.getSessionData('session_id'),
        country: country,
      };
      favouriteArr.push(favouriteData);
      localStorage.setItem(
        'favouriteCountriesList',
        JSON.stringify(favouriteArr)
      );
    } else {
      const favouriteArr = [];
      const favouriteData = {
        id: this.getNewFavouriteCountriesId(),
        user_id: this.login.getSessionData('session_id'),
        country: country,
      };
      favouriteArr.push(favouriteData);
      localStorage.setItem(
        'favouriteCountriesList',
        JSON.stringify(favouriteArr)
      );
    }
    return true;
  }
}

// interface GetResponse {
//   _embedded: {
//     countries: Country[];
//   };
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl =
    'https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson';

  constructor(private httpClient: HttpClient) {}

  getCountryList(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl);
    // .pipe(map((response) => response._embedded.products));
  }
}

// interface GetResponse {
//   _embedded: {
//     countries: Country[];
//   };
// }

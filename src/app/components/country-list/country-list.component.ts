import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  Countries: any[] = [];
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.listCountries();
  }

  listCountries() {
    this.countryService.getCountryList().subscribe((data) => {
      this.Countries = data;
      console.log(data);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-favourite-countries',
  templateUrl: './favourite-countries.component.html',
  styleUrls: ['./favourite-countries.component.scss'],
})
export class FavouriteCountriesComponent implements OnInit {
  public err: any = {};
  public result: any = {};
  public form: any = {};
  public data: any = {};
  public submitted = false;

  public datalist: any[] = [];

  public activePage: number = 0;

  public total_records: number = 0;
  activePageNumber: number = 0;
  start = 0;
  end = 5;
  limit = 5;

  public id: any;

  public alert_message: any;
  public alert_class: any;

  public show_loader: boolean = false;

  constructor(
    private login: AuthenticationService,
    private service: CountryService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.login.setTitle('Favourite Countries | Evaluation Demo');
    this.id = this.login.getSessionData('session_id');
  }

  ngOnInit(): void {
    this.get_data();
  }

  public async get_data() {
    this.show_loader = true;
    const favouriteData = localStorage.getItem('favouriteCountriesList');
    if (favouriteData !== null) {
      this.result = JSON.parse(favouriteData);
      this.datalist = this.result.filter((c: any) => c.user_id === this.id);
      this.total_records = this.datalist.length;
    }
    this.show_loader = false;
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.end = activePageNumber * this.limit;
    this.start = this.end - this.limit;
  }

  public remove_favourite(id: any) {
    const favouriteData = localStorage.getItem('favouriteCountriesList');
    if (favouriteData !== null) {
      const favouriteCountries = JSON.parse(favouriteData);
      favouriteCountries.splice(
        favouriteCountries.findIndex((a: any) => a.id === id),
        1
      );
      localStorage.setItem(
        'favouriteCountriesList',
        JSON.stringify(favouriteCountries)
      );
      this.alert_class = 'alert-success';
      this.alert_message = 'Data has been removed from favourites list';
    }
    this.get_data();
  }
}

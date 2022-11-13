import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss'],
})
export class ContinentsComponent implements OnInit {
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

  public slug: any;
  public alert_message: any;
  public alert_class: any;

  public favourite_countries: string[] = [];
  public show_loader: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private service: CountryService,
    private auth: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder
  ) {
    this.auth.setTitle('Countries | Evaluation Demo');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.slug = params['slug'].replace('-', ' ');
      this.get_api_data();
      this.get_favourite_countries();
    });
  }

  public async get_api_data() {
    this.show_loader = true;
    this.datalist = [];
    this.service.getCountryList().subscribe((res: any) => {
      this.show_loader = false;
      this.result = res;
      this.datalist = this.result.countries.filter(
        (p: any) => p.continent === this.slug
      );
      this.total_records = this.datalist.length;
    });
  }

  public get_favourite_countries() {
    const favouriteData = localStorage.getItem('favouriteCountriesList');
    if (favouriteData !== null) {
      let favourite_countries = JSON.parse(favouriteData);
      this.favourite_countries = favourite_countries.map((a: any) => a.country);
    }
  }

  public add_favourite(name: any) {
    this.service.add_favourite_list(name);
    this.alert_class = 'alert-success';
    this.alert_message = name + ' has been added to favourite lists';
    this.get_favourite_countries();
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.end = activePageNumber * this.limit;
    this.start = this.end - this.limit;
  }
}

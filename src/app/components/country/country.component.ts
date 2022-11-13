import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  public id: any;
  public err: any = {};
  public result: any = {};
  public data: any = {};
  public show_loader: boolean = false;

  constructor(
    private service: CountryService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) {
    this.auth.setTitle('View Country | Evaluation Demo');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.get_api_data();
  }

  public async get_api_data() {
    this.show_loader = true;
    this.service.getCountryList().subscribe((res: any) => {
      this.show_loader = false;
      this.result = res;
      this.data = this.result.countries.find((x: any) => x.name == this.id);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public err: any = {};
  public result: any = {};
  public form: any = {};
  public data: any = {};
  public registration_data: any = [];
  public submitted = false;

  public countries: any = [];
  public alert_message: any;
  public alert_class: any;

  public show_loader: boolean = false;

  constructor(
    private service: AuthenticationService,
    private country_service: CountryService,
    private router: Router,
    public fb: FormBuilder
  ) {
    console.log('constructor called');
    this.form = this.fb.group(
      {
        name: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
        ],
        email: [
          '',
          [Validators.required, Validators.email, this.checkExistingEmail()],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('^[a-zA-Z0-9]+$'),
          ],
        ],
        confirm_password: ['', Validators.required],
        country: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.get_api_data();
  }

  customValidator2() {
    console.log('testing');
  }

  passwordMatchValidator(group: FormGroup) {
    const newPass = group.controls['password'].value;
    const confirmPass = group.controls['confirm_password'].value;
    if (confirmPass !== '') {
      return newPass === confirmPass ? null : { notSame: true };
    } else {
      return null;
    }
  }

  checkExistingEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (
        control.value !== '' &&
        this.registration_data.some((user: any) => user.email == control.value)
      ) {
        return { checkExistingEmail: true };
      }
      return null;
    };
  }

  public async doFormAction() {
    this.err = {};
    this.service._gotoTop();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.show_loader = true;
    const oldrecords = localStorage.getItem('userList');
    if (oldrecords !== null) {
      const userArr = JSON.parse(oldrecords);
      const userData = {
        id: this.getNewUserId(),
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        country: this.form.value.country,
      };
      userArr.push(userData);
      localStorage.setItem('userList', JSON.stringify(userArr));
    } else {
      const userArr = [];
      const userData = {
        id: this.getNewUserId(),
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        country: this.form.value.country,
      };
      userArr.push(userData);
      localStorage.setItem('userList', JSON.stringify(userArr));
    }
    this.show_loader = false;
    this.alert_class = 'alert-success';
    this.alert_message = 'Registration has been completed successfully';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  getNewUserId() {
    const oldrecords = localStorage.getItem('userList');
    if (oldrecords !== null) {
      const userList = JSON.parse(oldrecords);
      return userList.length + 1;
    } else {
      return 1;
    }
  }

  get form_errors() {
    return this.form.controls;
  }

  form_validate_error(field: any, rule: any) {
    if (
      (this.submitted || this.form_errors[field].touched) &&
      this.form_errors[field].errors &&
      this.form_errors[field].errors[rule]
    ) {
      return false;
    }
    return true;
  }

  public async get_api_data() {
    this.show_loader = true;
    this.country_service.getCountryList().subscribe((res: any) => {
      this.show_loader = false;
      this.result = res;
      this.countries = this.result.countries;
    });
  }
}

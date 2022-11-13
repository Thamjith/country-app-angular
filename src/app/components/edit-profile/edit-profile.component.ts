import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public err: any = {};
  public result: any = {};
  public form: any = {};
  public data: any = {};
  public submitted = false;

  public alert_message: any;
  public alert_class: any;

  public registration_data: any = [];
  public countries: any = [];
  public id: any;

  public show_loader: boolean = false;

  constructor(
    private login: AuthenticationService,
    private service: CountryService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.login.setTitle('Edit Profile | Evaluation Demo');
    this.id = this.login.getSessionData('session_id');
    this.form = this.fb.group(
      {
        name: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
        ],
        email: [''],
        new_password: [
          '',
          [Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')],
        ],
        confirm_password: [''],
        country: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.get_api_data();
    this.get_current_user_data();
  }

  passwordMatchValidator(group: FormGroup) {
    const newPass = group.controls['new_password'].value;
    const confirmPass = group.controls['confirm_password'].value;
    return newPass === confirmPass ? null : { notSame: true };
  }

  public async get_api_data() {
    this.show_loader = true;
    this.service.getCountryList().subscribe((res: any) => {
      this.show_loader = false;
      this.result = res;
      this.countries = this.result.countries;
    });
  }

  public get_current_user_data() {
    const usersData = localStorage.getItem('userList');
    if (usersData !== null) {
      this.registration_data = JSON.parse(usersData);
    }
    this.data = this.registration_data.find((x: any) => x.id == this.id);
    this.form.patchValue({
      name: this.data.name,
      email: this.data.email,
      country: this.data.country,
    });
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

  public async deleteAccount() {
    this.registration_data.splice(
      this.registration_data.findIndex((a: any) => a.id === this.id),
      1
    );
    localStorage.setItem('userList', JSON.stringify(this.registration_data));
    this.alert_class = 'alert-success';
    this.alert_message = 'Account has been deleted successfully';
    await this.login.doLogout();
  }

  public async doFormAction() {
    this.err = {};
    this.login._gotoTop();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.show_loader = true;
    this.registration_data.splice(
      this.registration_data.findIndex((a: any) => a.id === this.id),
      1
    );
    const userData = {
      id: this.id,
      name: this.form.value.name,
      email: this.form.value.email,
      password:
        this.form.value.new_password == ''
          ? this.data.password
          : this.form.value.new_password,
      country: this.form.value.country,
    };
    this.registration_data.push(userData);
    localStorage.setItem('userList', JSON.stringify(this.registration_data));
    this.show_loader = false;
    //update user name in the session
    localStorage.setItem('session_name', this.form.value.name);
    this.alert_class = 'alert-success';
    this.alert_message = 'User details has been updated successfully';
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

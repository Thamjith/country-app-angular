import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public err: any = {};
  public result: any = {};
  public form: any = {};
  public data: any = {};
  public alert_message: any;
  public alert_type: any;
  public submitted = false;

  public registration_data: any = [];
  public show_loader: boolean = false;
  public alert_class: any;

  constructor(
    private spinner: NgxSpinnerService,
    private login: AuthenticationService,
    private router: Router,
    public fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    // this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.login.setTitle('Login | Evaluation Demo');

    const usersData = localStorage.getItem('userList');
    if (usersData !== null) {
      this.registration_data = JSON.parse(usersData);
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

  public async doLogin() {
    console.log('triggered');
    this.err = {};
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.show_loader = true;
    var email = this.form.value.email;
    var password = this.form.value.password;
    if (
      this.registration_data.some((user: any) => user.email === email) &&
      this.registration_data.some((user: any) => user.password === password)
    ) {
      //To check given email and passwords are exited or not
      let data = this.search(email, this.registration_data);
      this.login.saveSession(data);
      this.show_loader = false;
      this.alert_message = 'You have logged in successfully!';
      this.alert_class = 'alert-success';
      setTimeout(() => {
        this.router.navigate(['/continents/Asia']);
      }, 1000);
    } else {
      this.alert_class = 'alert-danger';
      this.show_loader = false;
      this.alert_message = 'Invalid user name or password!';
    }
  }

  public search(nameKey: any, myArray: any) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].email === nameKey) {
        return myArray[i];
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  constructor(public login: AuthenticationService) {}

  ngOnInit(): void {}

  public async doLogout() {
    await this.login.doLogout();
  }
}

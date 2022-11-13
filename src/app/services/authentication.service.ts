import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private titleService: Title, private router: Router) {}

  public saveSession(data: any) {
    localStorage.setItem('session_id', data.id);
    localStorage.setItem('session_name', data.name);
    localStorage.setItem('session_email', data.email);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getSessionData(key: any) {
    const result = localStorage.getItem(key);
    return result;
  }

  public async doLogout() {
    localStorage.removeItem('session_id');
    localStorage.removeItem('session_name');
    localStorage.removeItem('session_email');
    this.router.navigate(['login']);
  }

  _gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

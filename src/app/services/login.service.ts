import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private titleService: Title) {}

  public saveSession(data: any) {
    //localStorage.clear();//initially
    localStorage.setItem('session_id', data.id);
    localStorage.setItem('session_name', data.name);
    localStorage.setItem('session_email', data.email);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}

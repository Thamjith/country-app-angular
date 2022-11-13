import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.authService.getSessionData('session_id') === null ||
      !this.authService.getSessionData('session_id')
    ) {
      //console.log(route.data['page']);
      if (route.data['page'] != 'login') {
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    } else {
      //console.log(route.data['page']);
      if (route.data['page'] == 'login') {
        this.router.navigate(['continents/Asia']);
        return false;
      } else {
        return true;
      }
    }
  }

  // public getSessionData(key: any) {
  //   const result = localStorage.getItem(key);
  //   return result;
  // }
}

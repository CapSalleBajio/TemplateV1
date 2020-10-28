import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadModuleGuard implements CanLoad {

  constructor(
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('route: ', route);
    console.log('segments: ', segments);

    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

    if (route.path === 'students') {
      if (user.role === 'student') {
        return true;
      } else {
        this.router.navigate(['/', 'home', 'teachers']);
        return false;
      }
    } else if (route.path === 'teachers') {
      if (user.role === 'teacher') {
        return true;
      } else {
        this.router.navigate(['/', 'home', 'students']);
        return false;
      }
    } else {
      return false;
    }
  }
}

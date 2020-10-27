import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IExit } from 'src/app/interfaces/guards/exit.interface';

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<IExit> {
  canDeactivate(
    target: IExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return target.canGoOut ? target.canGoOut() : true;
    }
}

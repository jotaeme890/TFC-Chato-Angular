import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService, 
    private router: Router
  ) {}

  /**
   * The function `canActivate` checks if the user is an admin and returns true, logs out the user and
   * redirects to an access page with an error message if not.
   * @param {ActivatedRouteSnapshot} route - The `route` parameter in the `canActivate` method
   * represents the activated route snapshot at the time of navigation. It contains information about
   * the route, its parameters, and related data.
   * @param {RouterStateSnapshot} state - The `state` parameter in the `canActivate` method represents
   * the current router state snapshot, which includes information about the current activated route,
   * the URL, and the router state itself. It is of type `RouterStateSnapshot`.
   * @returns The `canActivate` method is returning an Observable that emits a boolean or UrlTree, a
   * Promise that resolves to a boolean or UrlTree, a boolean value, or a UrlTree. The method first
   * checks if the user is logged in and has an 'admin' role. If the user is an admin, it returns true.
   * If the user is logged in but not an admin, it logs
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      map(user => {
        if ( user && user.role === 'admin' ) {
          return true;
        }
        if( user )
          this.auth.logout();
        this.router.navigate(['/access'], { queryParams: { error: 'notAdmin' } });
        return false;
      })
    );
  }
}
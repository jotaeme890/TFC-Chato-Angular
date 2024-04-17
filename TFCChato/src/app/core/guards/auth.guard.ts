import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth:AuthService,
    private router: Router
  ) {}

  /**
   * The `canActivate` function checks if a user is logged in and navigates to the access page if not.
   * @param {ActivatedRouteSnapshot} route - The `route` parameter in the `canActivate` method
   * represents the activated route snapshot at the time of activation. It contains information about
   * the route, its parameters, and additional data associated with the route.
   * @param {RouterStateSnapshot} state - The `state` parameter in the `canActivate` method represents
   * the current state of the router. It provides information about the current route being activated
   * and the state of the router at that moment. This parameter is of type `RouterStateSnapshot`.
   * @returns The `canActivate` method is returning an Observable that emits a boolean or UrlTree, a
   * Promise that resolves to a boolean or UrlTree, a boolean value, or a UrlTree. Inside the method,
   * it is using the `isLogged$` observable from the `auth` service to check if the user is logged in.
   * If the user is not logged in, it navigates to the
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.isLogged$.pipe(tap((logged) => {
        console.log(logged);
        if (!logged) this.router.navigate(['/access']);
      })
    );
  }
}
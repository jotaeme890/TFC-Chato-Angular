import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private loginUrl: string = '/access';
  private homeUrl: string = '/home';

  /**
   * Creates an instance of AuthGuard.
   * 
   * @param auth - The AuthService for checking the user's authentication status.
   * @param router - The Router for navigation.
   */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * Checks if the user is logged in and redirects accordingly.
   * 
   * @param route - The activated route snapshot.
   * @param state - The router state snapshot.
   * @returns An observable, promise, boolean, or URL tree representing the result of the canActivate operation.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLogged$.pipe(
      tap(logged => {
        if (logged) {
          return this.router.createUrlTree([this.homeUrl]);
        } else {
          return this.router.createUrlTree([this.loginUrl]);
        }
      })
    );
  }
}

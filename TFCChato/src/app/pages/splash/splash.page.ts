import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage implements OnInit {

  options: AnimationOptions = {
    path: '../../../../assets/lotties/Splash-person.json',
  };
  
  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  /**
   * The constructor function takes AuthService and Router as parameters and assigns them to private
   * properties.
   * 
   * @param _auth The `_auth` parameter is an instance of the `AuthService` class, which is used for
   * handling authentication-related functionalities in the application.
   * @param _router The `_router` parameter is an instance of the Angular Router service. It is used
   * for navigating between different components in an Angular application by manipulating the
   * browser's URL.
   */
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  /**
   * The `ngOnInit` function subscribes to the `isLogged$` observable and navigates to the '/home'
   * route after a delay of 4 seconds.
   */
  ngOnInit() {
    this._auth.isLogged$.subscribe({
      next: _ => {
        setTimeout(() => {
          this._router.navigate(['/home'])
        }, 4000)
      },
      error: _ => {
        setTimeout(() => {
          this._router.navigate(['/access'])
        }, 4000)
      }
    });
  }


}

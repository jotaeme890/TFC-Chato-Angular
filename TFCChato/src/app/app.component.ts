import { Component } from '@angular/core';
import { LocalService } from './core/services/translate/local.service';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  /**
  * The constructor function redirects the user to the home page if logged in, otherwise to the access
  * page based on the authentication status.
  * 
  * @param auth The `auth` parameter is an instance of the `AuthService` class, which is used for
  * handling authentication-related functionalities in the application.
  * @param router The `router` parameter in the constructor is an instance of the Angular Router
  * service. It is used for navigating between different components in your Angular application based
  * on the specified routes.
  * @param localLang The `localLang` parameter in the constructor is of type `LocalService`. It is
  * likely used for handling localization or language-related functionalities in the application.
  */
  constructor(
    private auth:AuthService,
    private router:Router,
    private localLang: LocalService
  ) {
    this.auth.isLogged$.subscribe(logged=>{
      if(logged)
        this.router.navigate(['/home']);
      else
        this.router.navigate(['/access']); 
    });
  }
}

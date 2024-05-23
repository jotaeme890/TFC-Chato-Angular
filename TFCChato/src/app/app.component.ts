import { Component } from '@angular/core';
import { LocalService } from './core/services/translate/local.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { filter } from 'rxjs';
import { IonMenu, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isSplash: boolean = false;

  /**
   * The constructor initializes subscriptions to authentication and router events in a TypeScript
   * class.
   *
   * @param auth The `auth` parameter is of type `AuthService`, which is used for handling
   * authentication-related functionalities in the application. It seems to have an observable property
   * `isLogged$` that emits a boolean value indicating whether a user is logged in or not. The
   * constructor subscribes to this observable and navigates
   * @param router The `router` parameter in the constructor is an instance of the Angular Router
   * service. It is used for navigating between different views in the Angular application based on the
   * specified routes.
   * @param localLang The `localLang` parameter in the constructor is of type `LocalService`. It is a
   * private property that is used to access the `LocalService` service within the class. This service
   * is likely used for handling localization or language-related functionalities in the application.
   */
  constructor(
    protected auth: AuthService,
    private router: Router,
    private localLang: LocalService
  ) {
    this.auth.isLogged$.subscribe((logged) => {
      if (logged) this.router.navigate(['/home']);
      else this.router.navigate(['/access']);
    });
  }

  /**
   * The function `isActive` checks if the current URL includes a specified URL string and returns a
   * boolean value.
   *
   * @param url The `isActive` function takes a `url` parameter of type string. This function is likely
   * used to check if the current URL matches the provided `url` parameter.
   * @return A boolean value is being returned, indicating whether the current URL contains the
   * specified URL string.
   */
  isActive(url: string): boolean {
    return this.router.url.includes(url);
  }

  /**
   * The `toHome` function uses the Angular router to navigate to the '/home' route.
   */
  toHome() {
    this.router.navigate(['/home']);
  }

  /**
   * The `toSettings` function navigates to the settings route using the Angular router.
   */
  toSettings() {
    this.router.navigate(['/settings']);
  }

  /**
   * The `toData` function navigates to the '/data' route using the Angular router.
   */
  toData() {
    this.router.navigate(['/data']);
  }

  /**
   * The `logOut` function calls the `logout` method of the `auth` object.
   */
  logOut() {
    this.auth.logout().subscribe(async (_) => {
      await this.router.navigate(['/access']);
    });
  }

  /**
   * The `toAbout` function navigates to the '/about' route using the Angular router and close the menu.
   *
   * @param menu The menu
   */
  toAbout(menu: IonMenu) {
    this.router.navigate(['/about']);
    menu.close();
  }
}

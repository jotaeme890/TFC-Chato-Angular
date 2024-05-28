import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { UserInfo } from 'src/app/core/interfaces/user-info';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss'],
})
export class UsersInfoComponent implements OnInit {
  users$: Observable<any[]> | null = null;
  isScreenSmall: boolean = false;

  @Input() users: UserInfo[] | null | undefined;
  @Output() onUserClicked: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The constructor function takes a Router object as a parameter and assigns it to a private property
   * in a TypeScript class.
   *
   * @param router The `router` parameter in the constructor is of type `Router`. It is a dependency
   * injection that allows the class to navigate between different components in the Angular
   * application.
   * @param auth The `auth` parameter is of type `AuthService`, which is used for handling
   * authentication-related functionalities in the application. It seems to have an observable property
   * `isLogged$` that emits a boolean value indicating whether a user is logged in or not. The
   * constructor subscribes to this observable and navigates
   */
  constructor(
    private router: Router,
    protected auth: AuthService,
    protected firebaseService: FirebaseService

  ) {
    this.checkScreenSize(window.innerWidth);
  }

  ngOnInit() {
    this.users$ = combineLatest([
      this.firebaseService.users$,
      this.auth.user$
    ]).pipe(
      map(([users, currentUser]) =>
        users.filter(user => user.uuid !== currentUser?.uuid)
      )
    );
  }

  /**
   * Emits an event when a user is clicked.
   *
   * @param userId string | undefined - the ID of the user.
   */
  dataUser(userId: string | undefined) {
    this.onUserClicked.emit(userId);
  }

  /**
   * Listens for window resize events and updates the screen size accordingly.
   *
   * @param event any - the resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  /**
   * Checks the screen size and sets a boolean flag accordingly.
   *
   * @param width number - the width of the window.
   */
  private checkScreenSize(width: number) {
    this.isScreenSmall = width <= 900;
  }
}

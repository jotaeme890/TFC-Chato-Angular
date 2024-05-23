import { Injectable } from '@angular/core';
import { UserInfo } from '../../interfaces/user-info';
import { FirebaseService } from '../firebase/firebase.service';
import { take, map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  /**
   * The constructor function initializes a private firebaseService property using dependency
   * injection.
   *
   * @param firebaseService The `firebaseService` parameter is an instance of the `FirebaseService`
   * class that is being injected into the constructor using Angular's dependency injection mechanism.
   * This allows the component or service to have access to the functionality provided by the
   * `FirebaseService` class.
   */
  constructor(
    private firebaseService: FirebaseService,
    private auth: AuthService
  ) {}

  /**
   * The function `getUserById` retrieves user information by user ID from a Firebase service and
   * returns it as an observable stream.
   *
   * @param userId The `userId` parameter is a string that represents the unique identifier of a user.
   * @return An Observable of type UserInfo or undefined is being returned.
   */
  getUserById(userId: string): Observable<UserInfo | undefined> {
    return this.firebaseService.users$.pipe(
      take(1),
      map((users) => users.find((user) => user.uuid === userId))
    );
  }

  /**
   * The `updateUser` function in TypeScript updates user information using an authentication service.
   *
   * @param data The `data` parameter in the `updateUser` function is of type `UserInfo`. It likely
   * contains information about the user that needs to be updated, such as their name, email, or other
   * profile details.
   */
  updateUser(data: UserInfo) {
    this.auth.updateUser(data).subscribe();
  }
}

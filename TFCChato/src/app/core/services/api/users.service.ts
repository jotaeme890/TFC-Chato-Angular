import { Injectable } from '@angular/core';
import { UserInfo } from '../../interfaces/user-info';
import { FirebaseService } from '../firebase/firebase.service';
import { take, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  /**
   * The function `getUserById` retrieves user information by user ID from a Firebase service and
   * returns it as an observable stream.
   * 
   * @param userId The `userId` parameter is a string that represents the unique identifier of a user.
   * @return An Observable of type UserInfo or undefined is being returned.
   */
  getUserById( userId: string ): Observable<UserInfo | undefined> {
    return this.firebaseService.users$.pipe(
      take(1),
      map(users => users.find(user => user.uuid === userId))
    );
  }
  
  updateUser( data: UserInfo ){
    console.log( data );
  }
}

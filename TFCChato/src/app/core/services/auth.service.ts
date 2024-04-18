import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { User, UserCredentials } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();
  protected _user = new BehaviorSubject<User | null>(null);
  public user$ = this._user.asObservable();
  
  /**
  * Performs user login.
  * @param {Object} credentials - User credentials for login.
  * @returns {Observable<User>} Observable emitting the authenticated user.
  */
  public abstract login(credentials:Object):Observable<User>;

  /**
  * Registers a new user.
  * @param {Object} info - User information for registration.
  * @returns {Observable<any>} Observable emitting the result of the registration process.
  */
  public abstract register(info:Object):Observable<any>;

  /**
  * Logs out the current user.
  */
  public abstract logout():Observable<void>;

  /**
  * Retrieves information about the current user.
  * @returns {Observable<any>} Observable emitting information about the current user.
  */
  public abstract me():Observable<any>;

  /**
  * Updates the user's information.
  * @param {User} user - Updated user information.
  * @returns {Observable<any>} Observable emitting the result of the update process.
  */
  public abstract updateUser(user:User):Observable<any>;
}
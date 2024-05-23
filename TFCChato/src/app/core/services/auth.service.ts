import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo, UserCredentials } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService {
  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();
  protected _user = new BehaviorSubject<UserInfo | null>(null);
  public user$ = this._user.asObservable();

  /**
   * Performs user login.
   * @param {Object} credentials - User credentials for login.
   * @returns {Observable<UserInfo>} Observable emitting the authenticated user.
   */
  public abstract login(credentials: Object): Observable<UserInfo>;

  /**
   * Registers a new user.
   * @param {Object} info - User information for registration.
   * @returns {Observable<any>} Observable emitting the result of the registration process.
   */
  public abstract register(info: Object): Observable<any>;

  /**
   * Logs out the current user.
   */
  public abstract logout(): Observable<void>;

  /**
   * Retrieves information about the current user.
   * @returns {Observable<any>} Observable emitting information about the current user.
   */
  public abstract me(): Observable<any>;

  /**
   * Updates the user's information.
   * @param {UserInfo} user - Updated user information.
   * @returns {Observable<any>} Observable emitting the result of the update process.
   */
  public abstract updateUser(user: UserInfo): Observable<any>;
}

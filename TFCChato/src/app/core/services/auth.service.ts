import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { User, UserCredentials } from '../interfaces/user-credentials';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();
  protected _user = new BehaviorSubject<User | null>(null);
  public user$ = this._user.asObservable();
  
  public abstract login(credentials:Object):Observable<User>;

  public abstract register(info:Object):Observable<any>;

  public abstract logout():void;

  public abstract me():Observable<any>;

  public abstract updateUser(user:User):Observable<any>;
}
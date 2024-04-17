import { Observable, from, map, switchMap, tap } from 'rxjs';
import { User, UserCredentials, UserRegisterInfo } from '../../../interfaces/user-info';
import { FirebaseService, FirebaseUserCredential } from '../firebase.service';
import { AuthService } from '../../auth.service';

export class FirebaseAuthService extends AuthService{

  /**
  * Constructs the FirebaseAuthService class. It subscribes to the `isLogged$` observable from the FirebaseService to
  * automatically handle changes in the authentication state. If the user is logged in, it attempts to fetch the user's data.
  * If not logged in, it sets `_logged` and `_user` to `false` and `null`, respectively.
  */
  constructor(
    private firebaseSvc:FirebaseService
  ) { 
    super();

    this.firebaseSvc.isLogged$.subscribe(logged=>{
      if(logged){
        this.me().subscribe({
          next:data=>{
            this._user.next(data);
            this._logged.next(true);
          },
          error:err=>{
            console.log(err);
          }
        });
      }
      else{
        this._logged.next(false);
        this._user.next(null);
      }
    })
  }

  /**
  * Logs in a user using their credentials. Attempts to connect the user through Firebase using email and password.
  * If authentication fails or if a valid UID for the user is not received, it emits an error. If successful, it retrieves
  * the user information and updates the `_user` and `_logged` observables.
  * @param {UserCredentials} credentials - The credentials of the user, including email and password.
  * @returns Returns an Observable that may emit the logged-in user or an error in case of failed authentication.
  */
  public login(credentials: UserCredentials): Observable<any> {
    return new Observable<any>(subscr => {
      this.firebaseSvc.connectUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((credentials: FirebaseUserCredential | null) => {
          if (!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid) {
            subscr.error('Cannot login');
          }
          if (credentials) {
            this.me().subscribe(data => {
              this._user.next(data);
              this._logged.next(true);
              subscr.next(data);
              subscr.complete();
            });
          }
        })
        .catch(err => {
          subscr.error(err);
        });
    });
  }

  /**
  * Registers a new user using registration info. Creates a user in Firebase and, if successful, stores additional
  * user information in the database. If the registration fails to create a user or if necessary user details (like UID) are
  * missing, it emits an error. Otherwise, it completes the registration, updates user-related observables to reflect
  * the unauthenticated state, and emits the new user information.
  * @param {UserRegisterInfo} info - The registration info of the user.
  * @returns Returns an Observable that may emit null or detailed information of the newly registered user.
  */
  public register(info:UserRegisterInfo):Observable<any|null>{
    return new Observable<any>(subscr=>{
      this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials:FirebaseUserCredential|null)=>{
        if(!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
          subscr.error('Cannot register');
        if(credentials){
          var _info:User = {...info};
          _info.uuid = this.firebaseSvc.user?.uid;
          this.postRegister(_info).subscribe(data=>{
            this._user.next(null);
            this._logged.next(false);
            subscr.next(_info);
            subscr.complete();
          });
        }
      })
      .catch(err => {
        subscr.error(err);
      });
    });
  }

  /**
  * Helper method to handle post-registration tasks such as saving user-specific information to the Firestore database.
  * If the UUID is present, it proceeds to create a document in the database. Throws an error if no UUID is found, indicating
  * an unexpected scenario.
  * @param {User} info - The user info including name, surname, role, username, and email.
  * @returns Returns an Observable that performs the document creation in Firestore.
  */
  private postRegister(info:User):Observable<any>{
    if(info.uuid){
      return from(this.firebaseSvc.createDocumentWithId('userInfo',{
        name:info.name,
        surname: info.surname,
        role: info.role,
        username: info.username,
        email:info.email,
      }, info.uuid))
    }
    throw new Error('Error inesperado');
  }

  /**
  * Fetches the current user's information from Firestore based on their UID. If the user is connected (UID exists),
  * retrieves their detailed profile from the 'userInfo' collection. Throws an error if no user is currently connected.
  * @returns Returns an Observable that emits the user's detailed information or throws an error if the user is not connected.
  */
  public me():Observable<User>{
    if(this.firebaseSvc.user?.uid)
    return from(this.firebaseSvc.getDocument('userInfo', this.firebaseSvc.user.uid)).pipe(map(data=>{
      return {
        name:data.data['name'],
        surname:data.data['surname'],
        picture:data.data['photo']??"",
        email: data.data['email'],
        role: data.data['role'],
        username: data.data['username'],
        uuid:data.id
      }
    }));
    else
      throw new Error('User is not connected');
  }

  /**
  * Logs out the current user by calling the `signOut` method from FirebaseService. The method returns an Observable
  * that resolves when the sign-out process is complete.
  * @returns Returns an Observable indicating the completion of the logout process.
  */
  public logout(): Observable<any> {
    return from(this.firebaseSvc.signOut(false));
  }

  /**
  * Updates the current user's information in Firestore and refreshes the local user data by fetching updated info after the update.
  * Uses RxJS operators to chain these asynchronous tasks efficiently.
  * @param {User} user - The new user data to be updated in Firestore.
  * @returns Returns an Observable that emits the updated user data after both the Firestore document is updated and the local
  * user data is refreshed.
  */
  public override updateUser(user:User): Observable<User> {
    return from(this.firebaseSvc.updateDocument('users', this._user!.value!.uuid!,user)).pipe(switchMap(_=>this.me().pipe(tap(data=>{
      this._user.next(data);
    }))));
  }
}
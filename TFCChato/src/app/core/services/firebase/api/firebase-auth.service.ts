import { Observable, from, map, switchMap, tap } from 'rxjs';
import { User, UserCredentials, UserRegisterInfo } from '../../../interfaces/user-info';
import { FirebaseService, FirebaseUserCredential } from '../firebase.service';
import { AuthService } from '../../auth.service';

export class FirebaseAuthService extends AuthService{

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

  public login(credentials:UserCredentials):Observable<any>{
      return new Observable<any>(subscr=>{
        this.firebaseSvc.connectUserWithEmailAndPassword(credentials.email, credentials.password).then((credentials:FirebaseUserCredential|null)=>{
          if(!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid){
            subscr.error('Cannot login');
          }
          if(credentials){
            this.me().subscribe(data=>{
              this._user.next(data);
              this._logged.next(true);
              subscr.next(data);
              subscr.complete();
            });
          }
        })
      });
  } 

  public register(info:UserRegisterInfo):Observable<any|null>{
    return new Observable<any>(subscr=>{
      this.firebaseSvc.createUserWithEmailAndPassword(info.email, info.password).then((credentials:FirebaseUserCredential|null)=>{
        if(!credentials || !credentials.user || !credentials.user.user || !credentials.user.user.uid)
          subscr.error('Cannot register');
        if(credentials){
          var _info:User = {...info};
          _info.uuid = this.firebaseSvc.user?.uid;
          this.postRegister(_info).subscribe(data=>{
            /*
            I don´t want to go /home, because you can register like a user, not admin
            this._user.next(_info);
            this._logged.next(true); 
            
            subscr.next(_info);
            subscr.complete();
            */
          });
        }
      })
    });
  }

  private postRegister(info:User):Observable<any>{
    if(info.uuid){
      console.log(info);
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

  public logout(): Observable<any> {
    return from(this.firebaseSvc.signOut(false));
  }

  public override updateUser(user:User): Observable<User> {
    return from(this.firebaseSvc.updateDocument('users', this._user!.value!.uuid!,user)).pipe(switchMap(_=>this.me().pipe(tap(data=>{
      this._user.next(data);
    }))));
  }
}
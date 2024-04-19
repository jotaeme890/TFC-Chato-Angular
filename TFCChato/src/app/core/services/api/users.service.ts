import { Injectable } from '@angular/core';
import { UserInfo } from '../../interfaces/user-info';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  getUserById( userId: string ) {
    return this.firebaseService.getDocument( 'userInfo', userId )
  }

  updateUser( data: UserInfo ){
    console.log( data );
  }
}

import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  updateUser( data: User ){
    console.log( data );
  }
}

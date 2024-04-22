import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

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
    private firebaseService: FirebaseService
  ) { }
}

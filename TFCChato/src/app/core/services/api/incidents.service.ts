import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { incidentInfo } from '../../interfaces/incidents-info';
import { Observable, catchError, from, map, of, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
  constructor(private firebaseService: FirebaseService) {}

  /**
   * Retrieves an incident by its ID.
   *
   * @param incidentId string - the ID of the incident to retrieve.
   * @returns An Observable that emits the incident information if found, otherwise undefined.
   */
  getIncidentById(incidentId: string): Observable<incidentInfo | undefined> {
    return this.firebaseService.incidents$.pipe(
      take(1),
      map((incident) =>
        incident.find((incident) => incident.uuid === incidentId)
      )
    );
  }

  /**
   * Updates an incident.
   *
   * @param incident incidentInfo - the updated incident information.
   * @returns An Observable that emits a success message if the incident is updated successfully, otherwise emits an error message.
   */
  updateIncident(incident: incidentInfo): Observable<any> {
    return from(this.firebaseService.updateDocument('incidentsInfo', incident.uuid, incident)).pipe(
      map(response => ({ success: true, data: response })),
      catchError((err) =>
        throwError(
          () =>
            new Error(
              `Error: ${err.message}`
            )
        ))
    );
  }
}

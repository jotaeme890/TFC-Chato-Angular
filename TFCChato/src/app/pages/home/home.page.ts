import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filteredIncidents$: Observable<any[]> = this.firebaseService.incidents$;

  /**
   * Constructs a component constructor function.
   *
   * @param _auth AuthService - a service for handling authentication and user authorization.
   * @param router Router - an instance of the Angular Router service used for navigating between different components.
   * @param firebaseService FirebaseService - a service for handling Firebase-related operations.
   */
  constructor(
    private _auth: AuthService,
    private router: Router,
    public firebaseService: FirebaseService
  ) {}

  /**
   * Navigates to the incident data page.
   *
   * @param id string - the ID of the incident.
   */
  incidentInfo(id: string) {
    if (id) {
      console.log(id);
      this.router.navigate(['/home/incident-data', id]);
    }
  }

  ngOnInit() {
    this.showAll();
  }

  showAll() {
    this.filteredIncidents$ = this.firebaseService.incidents$
  }

  onFilterChange(filterValues: any) {
    console.log('filterValues:', filterValues);
    this.filteredIncidents$ = this.firebaseService.incidents$.pipe(
      map((incidents) =>
        incidents.filter((incident: incidentInfo) => {
          if(filterValues.userId && !filterValues.categoryName){
            return (
              incident.checked == filterValues.checked &&
              incident.resolved == filterValues.resolved &&
              incident.userId == filterValues.userId
            );
          } else if(filterValues.userId){
            return (
              incident.categoryName == filterValues.categoryName &&
              incident.checked == filterValues.checked &&
              incident.resolved == filterValues.resolved &&
              incident.userId == filterValues.userId
            );
          } else if(!filterValues.userId && filterValues.categoryName){
            return (
              incident.categoryName == filterValues.categoryName &&
              incident.checked == filterValues.checked &&
              incident.resolved == filterValues.resolved
            );
          }else if(!filterValues.userId && !filterValues.categoryName){
            return (
              incident.checked == filterValues.checked &&
              incident.resolved == filterValues.resolved
            );
          } else {
            return incident
          }
        })
      )
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { incidentInfo } from 'src/app/core/interfaces/incidents-info';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { ModalCategoryComponent } from '../data/modal-category/modal-category.component';
import { FilterComponent } from './filter/filter.component';
import { FilterMobileComponent } from './filter-mobile/filter-mobile.component';
import { FilterService } from 'src/app/core/services/filter/filter.service';

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
   * @param myModal - The ModalController - a service for managing modal dialogs.
   * @param filterService - A service for managing filter service.
   */
  constructor(
    private _auth: AuthService,
    private router: Router,
    public firebaseService: FirebaseService,
    private myModal: ModalController,
    private filterService: FilterService
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

  /**
   * Opens the filter modal and applies the selected filter settings.
   */
  async openFilterModal() {
    const mod = await this.myModal.create({
      component: FilterMobileComponent,
    });
    await mod.present();
    const results = await mod.onDidDismiss();
    if (results && results.data) {
      if (results.data === 'reset') {
        this.showAll();
      } else if (results.data) {
        this.onFilterChange(results.data);
      }
    }
  }

  /**
   * Method executed when the component is initialized.
   * Initializes the component by showing all incidents and subscribing to changes in the filter state.
   */
  ngOnInit() {
    this.showAll();
    this.filterService.getFilter().subscribe((filterValues) => {
      if (filterValues) {
        this.onFilterChange(filterValues);
      } else {
        this.showAll();
      }
    });
  }

  /**
   * Shows all incidents without applying any filters.
   */
  showAll() {
    this.filteredIncidents$ = this.firebaseService.incidents$;
  }

  /**
   * Applies the specified filter settings to the incidents.
   *
   * @param filterValues - The filter settings to apply.
   */
  onFilterChange(filterValues: any) {
    console.log('filterValues:', filterValues.controls);
    this.filteredIncidents$ = this.firebaseService.incidents$.pipe(
      map((incidents) =>
        incidents.filter((incident: incidentInfo) => {
          const userIdValue = filterValues.controls.userId.value;
          const categoryNameValue = filterValues.controls.categoryName.value;
          const checkedValue = filterValues.controls.checked.value;
          const resolvedValue = filterValues.controls.resolved.value;

          if (userIdValue && !categoryNameValue) {
            return (
              incident.checked == checkedValue &&
              incident.resolved == resolvedValue &&
              incident.userId == userIdValue
            );
          } else if (userIdValue) {
            return (
              incident.categoryName == categoryNameValue &&
              incident.checked == checkedValue &&
              incident.resolved == resolvedValue &&
              incident.userId == userIdValue
            );
          } else if (!userIdValue && categoryNameValue) {
            return (
              incident.categoryName == categoryNameValue &&
              incident.checked == checkedValue &&
              incident.resolved == resolvedValue
            );
          } else if (!userIdValue && !categoryNameValue) {
            return (
              incident.checked == checkedValue &&
              incident.resolved == resolvedValue
            );
          } else {
            return incident;
          }
        })
      )
    );
  }
}

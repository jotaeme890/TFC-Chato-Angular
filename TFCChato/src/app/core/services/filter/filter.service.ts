import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterState = new BehaviorSubject<FormGroup | null>(null);

  /**
   * Updates the filter state with the provided form.
   *
   * @param form - The form containing the updated filter settings.
   */
  updateFilterState(form: FormGroup) {
    this.filterState.next(form);
  }

  /**
   * Retrieves the current filter state as a BehaviorSubject.
   *
   * @returns A BehaviorSubject containing the current filter state.
   */
  getFilter(): BehaviorSubject<FormGroup | null> {
    return this.filterState;
  }

  /**
   * Initializes the filter state with default values.
   */
  initializeState() {
    const initialForm = new FormGroup({
      categoryName: new FormControl(undefined),
      userId: new FormControl(undefined),
      checked: new FormControl(false),
      resolved: new FormControl(false),
    });
    this.filterState.next(initialForm);
  }
}

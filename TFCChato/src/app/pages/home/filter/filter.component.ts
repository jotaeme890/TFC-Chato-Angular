import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FilterService } from 'src/app/core/services/filter/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  /**
   * EventEmitter for emitting a signal to reset filters.
   */
  @Output() resetRequested = new EventEmitter<void>();

  /**
   * Event emitter for signaling filter changes.
   */
  @Output() filterChanged = new EventEmitter<any>();

  form: FormGroup;

  /**
   * Creates an instance of FilterComponent.
   *
   * @param filterService - The FilterService for managing filter state.
   */
  constructor(private filterService: FilterService) {
    this.form = new FormGroup({
      categoryName: new FormControl(undefined),
      userId: new FormControl(undefined),
      checked: new FormControl(false),
      resolved: new FormControl(false),
    });
    this.subscribeToFilterState();
  }

  /**
   * Method executed when the component is initialized.
   * Initializes the form and subscribes to changes in filter state.
   */
  ngOnInit() {
    this.initForm();
    this.subscribeToFilterState();
  }

  /**
   * Initializes the form with the initial filter state.
   */
  initForm() {
    const initialFormState = this.filterService.getFilter().value;
    if (initialFormState) {
      this.form = new FormGroup({
        categoryName: new FormControl(initialFormState?.get('categoryName')?.value),
        userId: new FormControl(initialFormState.get('userId')?.value),
        checked: new FormControl(initialFormState.get('checked')?.value),
        resolved: new FormControl(initialFormState.get('resolved')?.value),
      });
    } else {
      this.form = new FormGroup({
        categoryName: new FormControl(undefined),
        userId: new FormControl(undefined),
        checked: new FormControl(false),
        resolved: new FormControl(false),
      });
    }
  }

  /**
   * Subscribes to changes in the filter state and updates the form accordingly.
   */
  subscribeToFilterState() {
    this.filterService.getFilter().subscribe((formState) => {
      if (formState && this.form !== formState) {
        this.form.setValue(formState.value, { emitEvent: false });
      }
    });
  }

  /**
   * Applies the current filter settings.
   */
  setFilters() {
    console.log(this.form.value);
    this.filterService.updateFilterState(this.form);
  }

  /**
   * Resets the filter settings to their default values.
   */
  resetFilters() {
    this.form.reset({
      categoryName: undefined,
      userId: undefined,
      checked: false,
      resolved: false,
    });
    this.filterService.updateFilterState(this.form);
    this.resetRequested.emit();
  }
}

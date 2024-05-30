import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FilterService } from 'src/app/core/services/filter/filter.service';

@Component({
  selector: 'app-filter-mobile',
  templateUrl: './filter-mobile.component.html',
  styleUrls: ['./filter-mobile.component.scss'],
})
export class FilterMobileComponent implements OnInit {
  /**
   * EventEmitter for emitting a signal to reset filters.
   */
  @Output() resetRequested = new EventEmitter<void>();

  @Output() filterChanged = new EventEmitter<any>();

  form: FormGroup;

  /**
   * Creates an instance of FiltersComponent.
   *
   * @param formBuilder - The FormBuilder service for building form instances.
   * @param modal - The ModalController - a service for managing modal dialogs.
   * @param filterService - A service for managing filter service.
   */
  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
    private filterService: FilterService
  ) {
    this.form = this.formBuilder.group({
      categoryName: [undefined],
      userId: [undefined],
      checked: [false],
      resolved: [false],
    });
  }

  /**
   * Method executed when the cancel action is triggered.
   * Dismisses the modal without passing any data.
   */
  onCancel() {
    this.modal.dismiss(null);
  }

  /**
   * Method executed when the component is initialized.
   * Initializes the form and subscribes to changes in the filter state.
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
        categoryName: new FormControl(
          initialFormState?.get('categoryName')?.value
        ),
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
   * Subscribes to changes in the filter state.
   */
  subscribeToFilterState() {
    this.filterService.getFilter().subscribe((formState) => {
      if (formState && this.form !== formState) {
        this.form.setValue(formState.value);
      }
    });
  }

  /**
   * Applies the current filter settings and dismisses the modal.
   */
  setFilters() {
    console.log(this.form.value);
    this.modal.dismiss(null);
    this.filterService.updateFilterState(this.form);
  }

  /**
   * Resets the filter settings to their default values and dismisses the modal.
   */
  resetFilters() {
    this.form.reset({
      categoryName: undefined,
      userId: undefined,
      checked: false,
      resolved: false,
    });
    this.modal.dismiss('reset');
    this.filterService.updateFilterState(this.form);
    this.resetRequested.emit();
  }
}

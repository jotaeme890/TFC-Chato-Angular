import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
   */
  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController
  ) {
    this.form = this.formBuilder.group({
      categoryName: [undefined],
      userId: [undefined],
      checked: [false],
      resolved: [false],
    });
  }

  ngOnInit() {}

  onCancel() {
    this.modal.dismiss(null);
  }

  /**
   * Sets the filters based on the form values.
   */
  setFilters() {
    console.log(this.form.value);
    this.modal.dismiss(this.form.value);
  }

  /**
   * Resets all filters and emits a signal to notify parent components.
   */
  resetFilters() {
    this.form.reset({
      categoryName: undefined,
      userId: undefined,
      checked: false,
      resolved: false,
    });
    this.modal.dismiss('reset');
  }
}

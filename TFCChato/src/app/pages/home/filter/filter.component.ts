import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  form: FormGroup;

  /**
   * Creates an instance of FiltersComponent.
   *
   * @param formBuilder - The FormBuilder service for building form instances.
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      category: [undefined],
      userId: [undefined],
      checked: [false],
      resolved: [false],
    });
  }

  ngOnInit() {}

  /**
   * Sets the filters based on the form values.
   */
  setFilters() {
    console.log(this.form.value);
  }

  /**
   * Resets all filters and emits a signal to notify parent components.
   */
  resetFilters() {
    this.form.reset();
    this.resetRequested.emit();
  }
}

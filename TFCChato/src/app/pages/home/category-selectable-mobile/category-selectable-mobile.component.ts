import { Component, EventEmitter, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonPopover, IonInput } from '@ionic/angular';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

export const CATEGORY_SELECTABLE_MOBILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CategorySelectableMobileComponent),
  multi: true,
};

@Component({
  selector: 'app-category-selectable-mobile',
  templateUrl: './category-selectable-mobile.component.html',
  styleUrls: ['./category-selectable-mobile.component.scss'],
  providers: [CATEGORY_SELECTABLE_MOBILE_VALUE_ACCESSOR]
})
export class CategorySelectableMobileComponent implements OnInit {
  /**
   * EventEmitter to emit a signal for resetting the selection.
   */
  @Input() resetSignal: EventEmitter<void> = new EventEmitter<void>();

  categorySelected: any | undefined;
  disabled: boolean = true;
  categories: any[] = [];

  /**
   * Setter method for setting the selected category.
   *
   * @param _category - The selected category.
   */
  @Input() set category(_category: any | null) {}

  /**
   * Method for propagating changes to the Angular forms API.
   */
  propagateChange = (obj: any) => {};

  /**
   * Creates an instance of CategoriesSelectorComponent.
   *
   * @param categoryService - The CategoriesService for fetching category data.
   * @param firebase - The FirebaseService for handling Firebase operations.
   */
  constructor(
    public categoryService: CategoriesService,
    public firebase: FirebaseService
  ) {}

  /**
   * Loads categories from the backend.
   */
  async onLoadCategories() {
    try {
      this.firebase.categories$.subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  /**
   * Selects a category by its ID.
   *
   * @param id - The ID of the category to select.
   * @param propagate - Boolean indicating whether to propagate the selection change.
   */
  private async selectCategory(
    id: string | undefined,
    propagate: boolean = false
  ) {
    if (id) {
      await this.categoryService.getCategory(id).then((category) => {
        this.categorySelected = category;
      });
    } else this.categorySelected = undefined;
    if (propagate) {
      this.propagateChange(this.categorySelected.data.name);
    }
  }

  /**
   * Writes a new value to the component.
   *
   * @param obj - The new value to be written.
   */
  writeValue(obj: any): void {
    if (obj) {
      this.selectCategory(obj.name);
    }
  }

  /**
   * Registers a callback function to be executed when the value changes.
   *
   * @param fn - The callback function to register.
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Registers a callback function to be executed when the component is touched.
   *
   * @param fn - The callback function to register.
   */
  registerOnTouched(fn: any): void {}

  /**
   * Sets the disabled state of the component.
   *
   * @param isDisabled - Boolean value indicating whether the component should be disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Method executed when the component is initialized.
   */
  ngOnInit() {
    this.resetSignal.subscribe(() => {
      this.clearSelection();
    });
  }

  /**
   * Clears the selected category.
   */
  clearSelection() {
    this.categorySelected = undefined;
  }

  /**
   * Filters categories based on a search value.
   *
   * @param value - The search value to filter categories.
   */
  private async filter(value: string) {}

  /**
   * Event handler for filtering categories.
   *
   * @param evt - The event containing the filter value.
   */
  onFilter(evt: any) {
    this.filter(evt.detail.value);
  }

  /**
   * Event handler for selecting a category from the list.
   *
   * @param popover - The IonPopover component for displaying the category list.
   * @param category - The selected category.
   */
  onCategoryClicked(popover: IonPopover, category: any) {
    this.selectCategory(category.uuid, true);
    popover.dismiss();
  }

  /**
   * Clears the search input field.
   *
   * @param input - The IonInput component representing the search input field.
   */
  clearSearch(input: IonInput) {
    input.value = '';
    this.filter('');
  }

  /**
   * Deselects the currently selected category.
   *
   * @param popover - The IonPopover component for displaying the category list.
   */
  deselect(popover: IonPopover | null = null) {
    this.selectCategory(undefined, true);
    if (popover) popover.dismiss();
  }
}

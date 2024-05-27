import { Component, EventEmitter, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonPopover, IonInput } from '@ionic/angular';
import { UsersService } from 'src/app/core/services/api/users.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

export const USER_SELECTABLE_MOBILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserSelectableMobileComponent),
  multi: true,
};

@Component({
  selector: 'app-user-selectable-mobile',
  templateUrl: './user-selectable-mobile.component.html',
  styleUrls: ['./user-selectable-mobile.component.scss'],
  providers: [USER_SELECTABLE_MOBILE_VALUE_ACCESSOR]
})
export class UserSelectableMobileComponent implements OnInit {
  /**
   * EventEmitter to emit a signal for resetting the selection.
   */
  @Input() resetSignal: EventEmitter<void> = new EventEmitter<void>();

  userSelected: any | undefined;
  disabled: boolean = true;
  users: any[] = [];

  /**
   * Setter method for setting the selected user.
   *
   * @param _user - The selected user.
   */
  @Input() set user(_user: any | null) {}

  /**
   * Method for propagating changes to the Angular forms API.
   */
  propagateChange = (obj: any) => {};

  /**
   * Creates an instance of UserSelectableComponent.
   *
   * @param userService - The UsersService for fetching user data.
   * @param firebase - The FirebaseService for handling Firebase operations.
   */
  constructor(
    public userService: UsersService,
    public firebase: FirebaseService
  ) {}

  /**
   * Loads users from the backend.
   */
  async onLoadCategories() {
    try {
      this.firebase.users$.subscribe({
        next: (users) => {
          this.users = users;
        },
      });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  /**
   * Selects a user by its ID.
   *
   * @param id - The ID of the user to select.
   * @param propagate - Boolean indicating whether to propagate the selection change.
   */
  private async selectUser(id: string | undefined, propagate: boolean = false) {
    if (id) {
      await this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.userSelected = user;
        },
      });
    } else this.userSelected = undefined;
    if (propagate) {
      this.propagateChange(this.userSelected.uuid);
    }
  }

  /**
   * Writes a new value to the component.
   *
   * @param obj - The new value to be written.
   */
  writeValue(obj: any): void {
    if (obj) {
      this.selectUser(obj.name);
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
   * Clears the selected user.
   */
  clearSelection() {
    this.userSelected = undefined;
  }

  /**
   * Filters users based on a search value.
   *
   * @param value - The search value to filter users.
   */
  private async filter(value: string) {}

  /**
   * Event handler for filtering users.
   *
   * @param evt - The event containing the filter value.
   */
  onFilter(evt: any) {
    this.filter(evt.detail.value);
  }

  /**
   * Event handler for selecting a user from the list.
   *
   * @param popover - The IonPopover component for displaying the user list.
   * @param user - The selected user.
   */
  onUserClicked(popover: IonPopover, user: any) {
    this.selectUser(user.uuid, true);
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
   * Deselects the currently selected user.
   *
   * @param popover - The IonPopover component for displaying the user list.
   */
  deselect(popover: IonPopover | null = null) {
    this.selectUser(undefined, true);
    if (popover) popover.dismiss();
  }
}

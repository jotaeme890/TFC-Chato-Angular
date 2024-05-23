import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

export const PICTURE_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PictureSelectableComponent),
  multi: true,
};

@Component({
  selector: 'app-picture-selectable',
  templateUrl: './picture-selectable.component.html',
  styleUrls: ['./picture-selectable.component.scss'],
  providers: [PICTURE_SELECTABLE_VALUE_ACCESSOR],
})
export class PictureSelectableComponent implements OnInit {
  private _picture = new BehaviorSubject('');
  public picture$ = this._picture.asObservable();
  isDisabled: boolean = false;
  hasValue: boolean = false;

  /**
   * Creates an instance of PictureSelectableComponent.
   * @param pictureModal - The ModalController for managing modal windows.
   */
  constructor(private pictureModal: ModalController) {}

  /**
   * This method is called when the component is being destroyed. It ensures
   * that any subscriptions to the BehaviorSubject for the selected picture are properly
   * terminated by completing the BehaviorSubject, preventing potential memory leaks.
   */
  ngOnDestroy(): void {
    this._picture.complete();
  }

  ngOnInit() {}

  /**
   * Method for propagating changes to the Angular forms API.
   */
  propagateChange = (obj: any) => {};

  /**
   * Writes a new value to the component.
   * @param obj - The new value to be written.
   */
  writeValue(obj: any): void {
    if (obj) {
      this.hasValue = true;
      this._picture.next(obj);
    }
  }

  /**
   * Registers a callback function to be executed when the value changes.
   * @param fn - The callback function to register.
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * Registers a callback function to be executed when the component is touched.
   * @param fn - The callback function to register.
   */
  registerOnTouched(fn: any): void {}

  /**
   * Sets the disabled state of the component.
   * @param isDisabled - Boolean value indicating if the component should be disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Changes the selected picture.
   * @param picture - The new picture value.
   */
  changePicture(picture: string) {
    this.hasValue = picture != '';
    this._picture.next(picture);
    this.propagateChange(picture);
  }

  /**
   * Event handler for changing the picture by uploading a file.
   * @param event - The event triggering the picture change.
   * @param fileLoader - The HTML input element for file uploading.
   */
  onChangePicture(event: Event, fileLoader: HTMLInputElement) {
    event.stopPropagation();
    fileLoader.onchange = () => {
      if (fileLoader.files && fileLoader.files?.length > 0) {
        var file = fileLoader.files[0];
        var reader = new FileReader();
        reader.onload = () => {
          this.changePicture(reader.result as string);
        };
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsDataURL(file);
      }
    };
    fileLoader.click();
  }

  /**
   * Event handler for deleting the selected picture.
   * @param event - The event triggering the picture deletion.
   */
  onDeletePicture(event: Event) {
    event.stopPropagation();
    this.changePicture('');
  }

  /**
   * Closes the picture modal.
   */
  close() {
    this.pictureModal?.dismiss();
  }
}

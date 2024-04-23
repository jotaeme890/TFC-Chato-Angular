import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserInfo } from 'src/app/core/interfaces/user-info';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent  implements OnInit {

  form: FormGroup;

  /**
   * Setter method for setting user information to be edited.
   * Populates the form fields with the provided user information.
   * @param user - The user information to be edited.
   */
  @Input() set userInfo(user: UserInfo) {
    if (user) {
      this.form.controls['picture'].setValue(user.picture?.url_medium);
      this.form.controls['name'].setValue(user.name);
      this.form.controls['surname'].setValue(user.surname);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['username'].setValue(user.username);
      this.form.controls['uuid'].setValue(user.uuid)
    }
  }

  /**
   * Creates an instance of UpdateUserComponent.
   * @param formBuilder - The FormBuilder service for building form instances.
   * @param modal - The ModalController for managing modal windows.
   */
  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
  ) {
    this.form = this.formBuilder.group({
      picture:['',[Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', [Validators.required]],
      uuid: [''],
    });
  }

  ngOnInit() {}

  /**
   * Handler for form submission.
   * Dismisses the modal and passes the updated user information to the parent component.
   */
  onSub() {
    this.modal.dismiss(this.form.value);
  }

  /**
   * Handler for cancel action.
   * Dismisses the modal without passing any data to the parent component.
   */
  onCancel() {
    this.modal.dismiss(null);
  }

}

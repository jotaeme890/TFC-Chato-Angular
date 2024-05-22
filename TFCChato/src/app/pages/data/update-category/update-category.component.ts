import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoryInfo } from 'src/app/core/interfaces/category-info';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent  implements OnInit {

  form: FormGroup;

  @Input() set userInfo(category: CategoryInfo) {
    if (category) {
      this.form.controls['name'].setValue(category.name);
      this.form.controls['description'].setValue(category.description);
      this.form.controls['uuid'].setValue(category.uuid)
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      uuid: ['']
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

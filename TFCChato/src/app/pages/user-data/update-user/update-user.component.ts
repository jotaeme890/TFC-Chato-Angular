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

  @Input() set user(user: UserInfo) {
    if (user) {
      console.log(user);
      this.form.controls['picture'].setValue(user.picture?.url_medium);
      this.form.controls['name'].setValue(user.name);
      this.form.controls['surname'].setValue(user.surname);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['username'].setValue(user.username);
      this.form.controls['uuid'].setValue(user.uuid)
    }
  }

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

  onSub() {
    this.modal.dismiss(this.form.value);
  }

  onCancel() {
    this.modal.dismiss(null);
  }

}

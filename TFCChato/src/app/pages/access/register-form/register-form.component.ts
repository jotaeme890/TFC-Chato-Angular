import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {
  form:FormGroup;
  hide = true;

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      firstSurname:['', [Validators.required]],
      secondSurname:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, PasswordValidation.passwordProto()]],
      repPassword:['', [Validators.required, PasswordValidation.passwordProto()]]
    }, {validators: [PasswordValidation.passwordMatch('password', ' repPassword')]});
  }

  ngOnInit() {}

  onSub(){}

}

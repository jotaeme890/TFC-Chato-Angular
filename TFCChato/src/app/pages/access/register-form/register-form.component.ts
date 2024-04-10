import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-info';
import { EmailValidation } from 'src/app/core/validators/email';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {
  form:FormGroup;
  hide = true;

  @Output() onsubmit = new EventEmitter<UserRegisterInfo>();

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      firstSurname:['', [Validators.required]],
      secondSurname:['', [Validators.required]],
      email:['', [Validators.required, EmailValidation.email()]],
      password:['', [Validators.required, PasswordValidation.passwordProto()]],
      repPassword:['', [Validators.required, PasswordValidation.passwordProto()]]
    }, {validators: [PasswordValidation.passwordMatch('password', 'repPassword')]});
  }

  ngOnInit() {}

  onSub(){
    this.onsubmit.emit(this.form?.value);
    this.form.reset();
  }

}

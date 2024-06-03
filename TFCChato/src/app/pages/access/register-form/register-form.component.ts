import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-info';
import { EmailValidation } from 'src/app/core/validators/email';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  hide = true;

  /* The `@Output() onsubmit = new EventEmitter<UserRegisterInfo>();` line in the code snippet is
  creating an output property named `onsubmit` of type `EventEmitter<UserRegisterInfo>`. This output
  property allows the `RegisterFormComponent` to emit events containing `UserRegisterInfo` data to
  its parent component or any component that uses this form. */
  @Output() onsubmit = new EventEmitter<UserRegisterInfo>();

  /**
   * Constructs the RegisterFormComponent.
   * Initializes the form with form controls and validators.
   * @param {FormBuilder} formBuilder - FormBuilder service for building the form.
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: ['', [Validators.required, EmailValidation.email()]],
        username: ['', [Validators.required]],
        password: [
          '',
          [Validators.required, PasswordValidation.passwordProto()],
        ],
        repPassword: [
          '',
          [Validators.required, PasswordValidation.passwordProto()],
        ],
      },
      {
        validators: [
          PasswordValidation.passwordMatch('password', 'repPassword'),
        ],
      }
    );
  }

  ngOnInit() {}

  /**
   * Event handler for form submission.
   * Emits the user registration information through the onsubmit event emitter.
   * Resets the form after submission.
   */
  onSub() {
    this.onsubmit.emit(this.form?.value);
    this.form.reset({
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      repPassword: '',
    });
  }
}

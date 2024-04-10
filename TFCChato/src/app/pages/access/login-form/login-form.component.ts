import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/interfaces/user-info';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {
  form:FormGroup;
  @Output() onsubmit = new EventEmitter<UserCredentials>();

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSub(){
    this.onsubmit.emit(this.form?.value);
    this.form.reset();
  }
}

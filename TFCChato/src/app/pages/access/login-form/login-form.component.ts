import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {
  form:FormGroup;

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSub(){}
}

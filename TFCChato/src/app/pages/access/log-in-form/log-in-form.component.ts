import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
})
export class LogInFormComponent  implements OnInit {

  form:FormGroup;

  @Output() onsubmit = new EventEmitter<UserCredentials>();

  constructor(
    private formBuilder:FormBuilder,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSub(){
    this.onsubmit.emit(this.form?.value);
    // Clear form
    this.form.reset();
  }

  
  toRegister() {
    this.router.navigate(['register'])
  }

}

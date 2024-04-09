import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  login = true;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  /** 
   * This method changes the componenet, and set the login or register componenent.
  */
  toRegister(){
    this.login = !this.login
  }

  /**
   * Get data from the Register Component and register a new user.
  */
  registerUser(){

  }

  /**
   * Get data from the Login Component and log a new user.
   */
  loginUser(){

  }

}

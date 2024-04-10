import { Component, OnInit } from '@angular/core';
import { UserCredentials, UserRegisterInfo } from 'src/app/core/interfaces/user-info';
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
  registerUser( data:UserRegisterInfo ){
    let _data:UserRegisterInfo = { ...data };
    _data.role = 'user';
    this.auth.register( _data ).subscribe({
      next:( data )=>{
        console.log("REGISTRADO");
        // PONER NAVEGACIÓN HACIA PERFIL
      },
      error:(err)=>{}
    });
  }

  /**
   * Get data from the Login Component and log a new user.
   */
  loginUser( data:UserCredentials ){
    let _data:UserCredentials = { ...data };

    this.auth.login( _data ).subscribe({
      next:( data )=>{
        console.log("LOGUEADO");
        // PONER NAVEGACIÓN HACIA PERFIL
      },
      error:(err)=>{}
    })
  }

}

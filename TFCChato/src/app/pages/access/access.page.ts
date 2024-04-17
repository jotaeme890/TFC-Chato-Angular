import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserCredentials, UserRegisterInfo } from 'src/app/core/interfaces/user-info';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
  providers: [MessageService]
})
export class AccessPage implements OnInit {

  login = true;

  constructor(
    private auth: AuthService,
    private translate: CustomTranslateService,
    private messageService: MessageService
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
        console.log( 'ALL WAS GOOD' );
        this.showSuccess( 'waitAdmin' );
      },
      error:(err)=>{
        if ( err.code ) {
          switch ( err.code ) {
            case 'auth/email-already-in-use':
              this.showError( 'emailUser' );
              break;
            case 'post-registration-error':
              this.showError( 'failRegister' );
              break;
          }
        } else {
          this.showError( 'Unknown registration error' );
        }
      }
    });
  }

  /**
   * Get data from the Login Component and register a new user.
   */
  loginUser( data:UserCredentials ){
    let _data:UserCredentials = { ...data };
    this.auth.login( _data ).subscribe({
      next:( data )=>{
        console.log( 'ALL WAS GOOD' );
      },
      error:(err)=>{
        console.log( 'BAD', err );
        if( err.code === 'auth/invalid-email' )
          this.showError( 'loginError' )
      }
    })
  }

  showSuccess(text: string) {
    let message = `toast.${text}`
    this.translate.get( message ).subscribe({
      next: ( text: string ) => {
        this.messageService.add({ key: 'tl', severity: 'info', detail: text });
        this.login = true;
      }
    });
  }

  showError(text: string) {
    let message = `toast.${text}`
    this.translate.get( message ).subscribe({
      next: ( text: string ) => {
        this.messageService.add({ key: 'tl', severity: 'error', detail: text, life: 6000 });
        this.login = true;
      }
    });
  }

}

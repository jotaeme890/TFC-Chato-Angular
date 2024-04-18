import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  /**
  * The constructor function subscribes to query parameters and displays an error message if the
  * 'error' parameter is 'notAdmin'.
  * 
  * @param auth AuthService - a service for handling authentication and user authorization.
  * @param translate The `translate` parameter in the constructor is of type `CustomTranslateService`.
  * It is used for handling translation services within the component or service where it is injected.
  * This service likely provides methods for translating text or messages into different languages or
  * for managing localization in the application.
  * @param messageService The `messageService` parameter in the constructor is of type
  * `MessageService`. It is likely used for displaying messages or notifications to the user within
  * the application.
  * @param route The `route` parameter in the constructor is of type `ActivatedRoute`, which is a
  * service provided by Angular that gives access to information about a route associated with a
  * component loaded in an outlet. It allows you to access route parameters, query parameters, and
  * other information related to the current route.
  * @param router The `router` parameter in the constructor is an instance of the Angular Router
  * service. It is used for navigating between different components in your Angular application based
  * on the defined routes.
  */
  constructor(
    private auth: AuthService,
    private translate: CustomTranslateService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'notAdmin') {
        this.showError( 'waitAdmin' );
      }
    });
  }

  ngOnInit() {
  }

  /**
  * The function toggles the value of the `login` property.
  */
  changeForm(){
    this.login = !this.login
  }

  /**
  * The function `registerUser` registers a user with the role 'user' and handles different error
  * cases during the registration process.
  * 
  * @param data The `registerUser` function takes in a parameter `data` of type `UserRegisterInfo`.
  * This parameter likely contains information about a user that is being registered, such as their
  * email, password, and any other relevant details.
  */
  registerUser( data:UserRegisterInfo ){
    let _data:UserRegisterInfo = { ...data };
    _data.role = 'user';
    this.auth.register( _data ).subscribe({
      next:( data )=>{
        console.log( 'ALL WAS GOOD' );
        this.showSuccess( 'waitAdmin' );
      },
      error:( err )=>{
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
  * The `loginUser` function in TypeScript logs in a user with provided credentials and handles
  * errors, displaying a specific error message for invalid email.
  * 
  * @param data UserCredentials object containing user login information, such as email and password
  */
  loginUser( data:UserCredentials ){
    let _data:UserCredentials = { ...data };
    this.auth.login( _data ).subscribe({
      next:( data )=>{
        console.log( 'ALL WAS GOOD' );
      },
      error:( err )=>{
        console.log( 'BAD', err );
        if( err.code === 'auth/invalid-email' )
          this.showError( 'loginError' )
      }
    })
  }

  /**
  * The function `showSuccess` displays a success message after translating the input text.
  * 
  * @param text The `text` parameter in the `showSuccess` function is a string that represents the
  * message to be displayed as a success toast notification.
  */
  showSuccess(text: string) {
    let message = `toast.${text}`
    this.translate.get( message ).subscribe({
      next: ( text: string ) => {
        this.messageService.add({ key: 'tl', severity: 'info', detail: text });
        this.login = true;
      }
    });
  }

  /**
  * The function `showError` displays an error message using a translation service and a message
  * service.
  * 
  * @param text The `text` parameter in the `showError` function is a string that represents the error
  * message to be displayed.
  */
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

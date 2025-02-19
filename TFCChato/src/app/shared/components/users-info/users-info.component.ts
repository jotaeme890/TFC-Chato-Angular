import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/core/interfaces/user-info';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss'],
})
export class UsersInfoComponent  implements OnInit {

  @Input() users: UserInfo[] | null | undefined;
  @Output() onUserClicked: EventEmitter<string> = new EventEmitter<string>()

  /**
  * The constructor function takes a Router object as a parameter and assigns it to a private property
  * in a TypeScript class.
  * 
  * @param router The `router` parameter in the constructor is of type `Router`. It is a dependency
  * injection that allows the class to navigate between different components in the Angular
  * application.
  */
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  dataUser( userId: string | undefined ) {
    this.onUserClicked.emit(userId)
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfo } from 'src/app/core/interfaces/user-info';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss'],
})
export class UsersInfoComponent  implements OnInit {

  @Input() users: UserInfo[] | null | undefined;

  @Output() userData= new EventEmitter<UserInfo>();

  constructor() { }

  ngOnInit() {}

  dataUser( user: UserInfo ) {
    console.log(user);
    this.userData.emit( user );
  }

}

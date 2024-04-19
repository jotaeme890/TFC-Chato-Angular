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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  dataUser( userId: string | undefined ) {
    console.log(userId);
    this.router.navigate([`/data/user/${userId}`]);
  }

}

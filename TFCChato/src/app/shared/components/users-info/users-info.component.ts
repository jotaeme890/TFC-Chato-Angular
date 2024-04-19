import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/core/interfaces/user-info';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss'],
})
export class UsersInfoComponent  implements OnInit {

  @Input() users: UserInfo[] | null | undefined;

  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/core/interfaces/user-info';
import { UsersService } from 'src/app/core/services/api/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  userId: string | null = '';
  user: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe(user => {
          if (user) {
            this.user = user;
          } else {
            console.log('User not found!');
          }
        });
      }
    });
  }

}

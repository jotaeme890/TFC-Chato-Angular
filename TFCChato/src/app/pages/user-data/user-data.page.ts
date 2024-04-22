import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { UserInfo } from 'src/app/core/interfaces/user-info';
import { UsersService } from 'src/app/core/services/api/users.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { MediaService } from 'src/app/core/services/media.service';
import { UpdateUserComponent } from './update-user/update-user.component';

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
    private userService: UsersService,
    private _router: Router,
    private myModal: ModalController,
    private media:MediaService,
    private _firebaseSvc: FirebaseService,
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

  async  updateUser( user: UserInfo ) {
    const modal = await this.myModal.create({
      component: UpdateUserComponent,
      componentProps: {
        user: user
      }
    });
    await modal.present();
    const results = await modal.onDidDismiss();
    if (results && results.data) {
      if( results.data.picture.substring(0,4) == 'data' ) {
        dataURLtoBlob(results.data.picture,   (blob: Blob) => {
          this.media.upload(blob).subscribe((media: number[]) => {
            results.data.picture = media[0];
            this.userService.updateUser(results.data);
          });
        });
        this._router.navigate(['/data']);
      } else {
        results.data.picture = user.picture;
        this.userService.updateUser(results.data);
        this._router.navigate(['/data']);
      }
    }

  }

}


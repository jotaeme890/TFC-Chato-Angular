import { Component, OnInit } from '@angular/core';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { UsersService } from 'src/app/core/services/api/users.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UpdateUserComponent } from '../user-data/update-user/update-user.component';
import { ModalController } from '@ionic/angular';
import { MediaService } from 'src/app/core/services/media.service';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/core/interfaces/user-info';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: any | undefined;
  currentLang: string;

  /**
   * Creates an instance of UserDataPage.
   *
   * @param _firebaseService - The FirebaseService for Firebase operations.
   * @param userService - The UsersService for user-related operations.
   * @param myModal - The ModalController for creating and managing modals.
   * @param media - The MediaService for media-related operations.
   * @param _router - The Router for navigating between routes.
   * @param auth - The AuthService for authentication-related operations.
   * @param translate The `translate` parameter in the constructor is of type `CustomTranslateService`.
   * It is used for handling translation services within the component or service where it is injected.
   * This service likely provides methods for translating text or messages into different languages or
   * for managing localization in the application.
   */
  constructor(
    private _firebaseService: FirebaseService,
    private userService: UsersService,
    private myModal: ModalController,
    private media: MediaService,
    private _router: Router,
    protected auth: AuthService,
    private translate: CustomTranslateService,
  ) {
    this.currentLang = this.translate.getCurrentLang();
  }

  /**
   * Method executed when the component is initialized.
   * Retrieves the user data for the currently logged-in user.
   */
  ngOnInit() {
    this.userService
      .getUserById(this._firebaseService.user!.uid)
      .subscribe((user) => {
        if (user) {
          this.user = user;
        } else {
          console.log('User not found!');
        }
      });
  }

  /**
   * Method for updating user profile information.
   *
   * @param user - The updated user information.
   */
  async updateUser(user: UserInfo) {
    const mod = await this.myModal.create({
      component: UpdateUserComponent,
      componentProps: {
        userInfo: user,
      },
      cssClass: 'modalDesign',
    });
    await mod.present();
    const results = await mod.onDidDismiss();
    if (results && results.data) {
      console.log(results.data);
      if (results?.data?.picture) {
        if (results?.data?.picture?.substring(0, 4) == 'data') {
          dataURLtoBlob(results.data.picture, (blob: Blob) => {
            this.media.upload(blob).subscribe((media: number[]) => {
              results.data.picture = media[0];
              this.userService.updateUser(results.data);
            });
          });
        } else {
          results.data.picture = user.picture;
          this.userService.updateUser(results.data);
        }
      } else {
        results.data.picture = '';
        this.userService.updateUser(results.data);
      }
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}

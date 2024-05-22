import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class DataPage implements OnInit {

  constructor(
    protected _firebaseService: FirebaseService,
    private router: Router,
    private _categoryService: CategoriesService,
    private translate: CustomTranslateService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  userInfo(userId: string) {
    this.router.navigate([`/data/user/${userId}`]);
  }

  deleteCategory(info: any) {
    this._categoryService.deleteCategory(info).subscribe({
      next: _ => this.showSuccess( 'good' ),
      error: _ => this.showError( 'cant' )
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
        this.messageService.add({ key: 'tl', severity: 'success', detail: text });
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
      }
    });
  }
}

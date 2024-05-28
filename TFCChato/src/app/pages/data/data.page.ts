import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryInfo } from 'src/app/core/interfaces/category-info';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { CustomTranslateService } from 'src/app/core/services/translate/translate.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ModalController } from '@ionic/angular';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class DataPage implements OnInit {
  /**
   * Constructs a component constructor function.
   *
   * @param _firebaseService FirebaseService - a service for handling Firebase-related operations.
   * @param router Router - an instance of the Angular Router service used for navigating between different components.
   * @param _categoryService CategoriesService - a service for managing categories.
   * @param translate CustomTranslateService - a service for handling translation services within the component or service where it is injected.
   * @param messageService MessageService - a service for displaying messages or notifications to the user within the application.
   * @param dialog MatDialog - a service for displaying dialog boxes.
   * @param myModal ModalController - a service for managing modal dialogs.
   */
  constructor(
    protected _firebaseService: FirebaseService,
    private router: Router,
    private _categoryService: CategoriesService,
    private translate: CustomTranslateService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private myModal: ModalController
  ) {}

  ngOnInit() {}

  /**
   * Method to export data to CSV format.
   * Fetches data from Firebase, converts it to CSV format, and initiates CSV file downloads.
   *
   * @remarks
   * This method retrieves data from Firebase using the FirebaseService, converts it to CSV format,
   * and initiates the download of CSV files for each dataset.
   */
  exportData(): void {
    this._firebaseService
      .getAllData()
      .then((dataObject) => {
        const csvFiles = this.jsonToCSV(dataObject);
        for (const key in csvFiles) {
          if (csvFiles.hasOwnProperty(key)) {
            const csvContent = csvFiles[key];
            this.downloadCSV(csvContent, `${key}.csv`);
          }
        }
      })
      .catch((error) => console.error('Failed to fetch data', error));
  }

  /**
   * Converts JSON data to CSV format.
   *
   * @param dataObject - The JSON data object to be converted to CSV.
   * @returns An object containing CSV content for each dataset.
   */
  public jsonToCSV(dataObject: { [key: string]: any[] }): {
    [key: string]: string;
  } {
    const csvFiles: { [key: string]: string } = {};

    for (const key in dataObject) {
      if (dataObject.hasOwnProperty(key) && dataObject[key].length > 0) {
        const headers = Object.keys(dataObject[key][0]);
        const csvRows = dataObject[key].map((row) =>
          headers
            .map((fieldName) =>
              JSON.stringify(row[fieldName], (key, value) =>
                value == null ? '' : value
              )
            )
            .join(',')
        );
        csvRows.unshift(headers.join(','));
        csvFiles[key] = csvRows.join('\r\n');
      }
    }
    return csvFiles;
  }

  /**
   * Initiates the download of a CSV file.
   *
   * @param csvContent - The CSV content to be downloaded.
   * @param filename - The name of the CSV file.
   */
  public downloadCSV(csvContent: string, filename: string): void {
    if (!csvContent) {
      console.error('No CSV content available for download.');
      return;
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Opens a confirmation dialog for deleting a category.
   *
   * @param category CategoryInfo - the category information to be deleted.
   */
  openDialog(category: CategoryInfo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategory(category);
      }
    });
  }

  /**
   * Navigates to the user information page.
   *
   * @param userId string - the ID of the user.
   */
  userInfo(userId: string) {
    this.router.navigate([`/data/user/${userId}`]);
  }

  /**
   * Opens a modal dialog for editing a category.
   *
   * @param info CategoryInfo - the category information to be edited.
   */
  async editCategory(info: CategoryInfo) {
    const mod = await this.myModal.create({
      component: ModalCategoryComponent,
      componentProps: {
        categoryInfo: info,
        mode: 'update',
      },
    });
    await mod.present();
    const results = await mod.onDidDismiss();
    if (results && results.data) {
      if (results?.data) {
        this._categoryService
          .updateCategory(results?.data, info.name)
          .subscribe({
            next: (_) => this.showSuccess('good'),
            error: (_) => this.showError('cant'),
          });
      }
    }
  }

  /**
   * Opens a modal dialog for creating a new category.
   */
  async createCategory() {
    const mod = await this.myModal.create({
      component: ModalCategoryComponent,
      componentProps: {
        categoryInfo: null,
        mode: 'create',
      },
    });
    await mod.present();
    const results = await mod.onDidDismiss();
    if (results && results.data) {
      if (results?.data) {
        this._categoryService.createCategory(results?.data).subscribe({
          next: async (_) => {
            this.showSuccess('good');
            await Haptics.impact({ style: ImpactStyle.Medium });
          },
          error: async (_) => {
            this.showError('cant');
            await Haptics.impact({ style: ImpactStyle.Heavy });
          },
        });
      }
    }
  }

  /**
   * Deletes a category.
   *
   * @param info CategoryInfo - the category to delete.
   */
  deleteCategory(info: CategoryInfo) {
    this._categoryService.deleteCategory(info).subscribe({
      next: async (_) => {
        this.showSuccess('good');
        await Haptics.impact({ style: ImpactStyle.Medium });
      },
      error: async (_) => {
        this.showError('cant');
        await Haptics.impact({ style: ImpactStyle.Heavy });
      },
    });
  }

  /**
   * The function `showSuccess` displays a success message after translating the input text.
   *
   * @param text The `text` parameter in the `showSuccess` function is a string that represents the
   * message to be displayed as a success toast notification.
   */
  showSuccess(text: string) {
    let message = `toast.${text}`;
    this.translate.get(message).subscribe({
      next: (text: string) => {
        this.messageService.add({
          key: 'tl',
          severity: 'success',
          detail: text,
        });
      },
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
    let message = `toast.${text}`;
    this.translate.get(message).subscribe({
      next: (text: string) => {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          detail: text,
          life: 6000,
        });
      },
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/translate/translate';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { ShortenTextPipe } from '../core/pipes/shorten-text.pipe';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';
import { IncidentsInfoComponent } from './components/incidents-info/incidents-info.component';
import { CategoriesInfoComponent } from './components/categories-info/categories-info.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'primeng/chart';
import { UserCircleGraphicComponent } from './components/user-circle-graphic/user-circle-graphic.component';


@NgModule({
  declarations: [
    UsersInfoComponent,
    PictureSelectableComponent,
    IncidentsInfoComponent,
    CategoriesInfoComponent,
    ConfirmDialogComponent,
    UserCircleGraphicComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    IonicModule.forRoot(), 
    // Translate
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
    ShortenTextPipe,
    ShortenTextPipe,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    UsersInfoComponent,
    PictureSelectableComponent,
    IncidentsInfoComponent,
    CategoriesInfoComponent,
    ConfirmDialogComponent,
    UserCircleGraphicComponent
  ]
})
export class SharedModule { }

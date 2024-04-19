import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/translate/translate';
import { CapitalizeInitialPipe } from '../core/pipes/capitalize-initial.pipe';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { ShortenTextPipe } from '../core/pipes/shorten-text.pipe';


@NgModule({
  declarations: [
    UsersInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(), 
    // Translate
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
    ShortenTextPipe
  ],
  exports: [
    UsersInfoComponent
  ]
})
export class SharedModule { }

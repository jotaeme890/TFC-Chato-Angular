import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataPageRoutingModule } from './data-routing.module';

import { DataPage } from './data.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/translate/translate';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UpdateCategoryComponent } from './update-category/update-category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // Reactive form
    ReactiveFormsModule,
    IonicModule,
    DataPageRoutingModule,
    SharedModule,
    MatTabsModule,
    // Translate
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
    ToastModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    SharedModule
  ],
  declarations: [
    DataPage,
    UpdateCategoryComponent
  ]
})
export class DataPageModule {}

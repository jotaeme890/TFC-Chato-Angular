import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentDataPageRoutingModule } from './incident-data-routing.module';

import { IncidentDataPage } from './incident-data.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/translate/translate';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentDataPageRoutingModule,
    // Translate
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
    ToastModule,
  ],
  declarations: [IncidentDataPage]
})
export class IncidentDataPageModule {}

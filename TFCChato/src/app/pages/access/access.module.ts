import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AccessPageRoutingModule } from './access-routing.module';

import { AccessPage } from './access.page';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/translate/translate';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AccessPageRoutingModule,
    // Translate
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
     // Angular Material
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule
  ],
  declarations: [
    AccessPage,
    LogInFormComponent,
    RegisterFormComponent
  ]
})
export class AccessPageModule {}

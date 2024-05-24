import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategorySelectableComponent } from './category-selectable/category-selectable.component';
import { FilterComponent } from './filter/filter.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/translate/translate';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserSelectableComponent } from './user-selectable/user-selectable.component';
import { ItemCategoryComponent } from './item-category/item-category.component';
import { ItemUserComponent } from './item-user/item-user.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    // Translate
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
    MatCheckboxModule
  ],
  declarations: [
    HomePage,
    CategorySelectableComponent,
    ItemCategoryComponent,
    ItemUserComponent,
    FilterComponent,
    UserSelectableComponent
  ]
})
export class HomePageModule {}

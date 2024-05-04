import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentDataPageRoutingModule } from './incident-data-routing.module';

import { IncidentDataPage } from './incident-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentDataPageRoutingModule
  ],
  declarations: [IncidentDataPage]
})
export class IncidentDataPageModule {}

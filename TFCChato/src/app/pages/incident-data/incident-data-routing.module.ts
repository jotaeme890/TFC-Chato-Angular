import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentDataPage } from './incident-data.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentDataPageRoutingModule {}

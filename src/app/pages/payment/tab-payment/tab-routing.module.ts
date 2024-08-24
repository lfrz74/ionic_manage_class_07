import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabPaymentPage } from './tab-payment.page';

const routes: Routes = [
  {
    path: '',
    component: TabPaymentPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabClassPage } from './tab-class.page';

const routes: Routes = [
  {
    path: '',
    component: TabClassPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabClassPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabStudentPage } from './tab-student.page';

const routes: Routes = [
  {
    path: '',
    component: TabStudentPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabStudentPageRoutingModule {}

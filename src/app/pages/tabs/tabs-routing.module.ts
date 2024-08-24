import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-student',
        loadChildren: () =>
          import('../students/tab-student/tab-student.module').then((m) => m.TabStudentPageModule),
      },
      {
        path: 'tab-class',
        loadChildren: () =>
          import('../classes/tab-class/tab-class.module').then((m) => m.TabClassPageModule),
      },
      {
        path: 'tab-payment',
        loadChildren: () =>
          import('../payment/tab-payment/tab-payment.module').then((m) => m.TabPaymentPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab-student',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab-student',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

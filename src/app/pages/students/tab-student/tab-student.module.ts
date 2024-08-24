import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabStudentPage } from './tab-student.page';
import { TabStudentPageRoutingModule } from './tab-student-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabStudentPageRoutingModule
  ],
  declarations: [TabStudentPage]
})
export class TabStudentPageModule {}

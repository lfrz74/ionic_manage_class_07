import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TabStudentPage } from './tab-student.page';
import { TabStudentPageRoutingModule } from './tab-student-routing.module';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { ListDataComponent } from '../../../shared/list-data/list-data.component';
import { FormStudentComponent } from './components/form-student/form-student.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabStudentPageRoutingModule,
    TranslateModule.forChild(),
    ListDataComponent,
  ],
  declarations: [TabStudentPage, ListStudentsComponent, FormStudentComponent],
})
export class TabStudentPageModule {}

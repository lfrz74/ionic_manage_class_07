import { Component, OnInit } from '@angular/core';
import { capSQLiteChanges } from '@capacitor-community/sqlite';

import { Student } from '../../../../../models/student';
import { SqliteManagerService } from '../../../../../services/sqlite-manager.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {
  public students!: Student[];
  public showForm: boolean;
  public studentSelected!: Student;

  constructor(
    private sqliteService: SqliteManagerService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.showForm = false;
    this.students = [];
    //this.studentSelected = null;
  }
  ngOnInit(): void {
    this.getStudents();
  }

  onShowForm() {
    this.showForm = true;
  }

  getStudents(search?: string) {
    this.sqliteService.getStudents(search).then((students: Student[]) => {
      this.students = students;
    });
  }

  filterListStudents($event: any) {
    if ($event) {
      this.getStudents($event.detail.value);
    }
  }

  updateStudent(item: Student) {
    this.studentSelected = item;
    this.showForm = true;
  }

  deleteStudentConfirm(item: Student) {
    const self = this;
    this.alertService.alertConfirm(
      this.translate.instant('label.confirm'),
      this.translate.instant('label.confirm.message.student') +
        ': ' +
        item.name +
        ' ' +
        item.surname,
      function () {
        self.deleteStudent(item);
      }
    );
  }

  deleteStudent(student: Student) {
    this.sqliteService
      .deleteStudent(student)
      .then((student: capSQLiteChanges) => {
        this.alertService.alertMessage(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.remove.student')
        );
        this.getStudents();
      })
      .catch((err) => {
        this.alertService.alertMessage(
          this.translate.instant('label.error.message.remove.student'),
          this.translate.instant(err.message)
        );
      });
  }

  onCloseForm() {
    this.showForm = false;
    this.studentSelected = new Student();
    this.getStudents();
  }
}

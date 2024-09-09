import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { capSQLiteChanges } from '@capacitor-community/sqlite';

import { Student } from '../../../../../models/student';
import { SqliteManagerService } from '../../../../../services/sqlite-manager.service';
import { AlertService } from '../../../../../services/alert.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class FormStudentComponent implements OnInit {
  @Input() student!: Student;
  @Output() close: EventEmitter<boolean>;
  public update!: boolean;

  constructor(
    private sqliteService: SqliteManagerService,
    private translate: TranslateService,
    private alertService: AlertService
  ) {
    this.close = new EventEmitter<boolean>();
  }

  ngOnInit() {
    if (!this.student) {
      this.student = new Student();
    } else {
      this.update = true;
    }
  }

  closeForm() {
    this.close.emit(true);
  }

  createUpdateStudent() {
    if (this.update) {
      this.sqliteService
        .updateStudent(this.student)
        .then((student: capSQLiteChanges) => {
          this.alertService.alertMessage(
            this.translate.instant('label.success'),
            this.translate.instant('label.success.message.edit.student')
          );
          this.closeForm();
        })
        .catch((err) => {
          this.alertService.alertMessage(
            this.translate.instant('label.error.message.edit.student'),
            this.translate.instant(err.message)
          );
        });
    } else {
      this.sqliteService
        .createStudent(this.student)
        .then((student: capSQLiteChanges) => {
          this.alertService.alertMessage(
            this.translate.instant('label.success'),
            this.translate.instant('label.success.message.add.student')
          );
          this.closeForm();
        })
        .catch((err) => {
          this.alertService.alertMessage(
            this.translate.instant('label.error.message.add.studemt'),
            this.translate.instant(err.message)
          );
        });
    }
  }
}

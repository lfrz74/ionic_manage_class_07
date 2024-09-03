import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Student } from '../../../../../models/student';
import { SqliteManagerService } from 'src/app/services/sqlite-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class FormStudentComponent implements OnInit {
  @Input() student!: Student;
  @Output() close: EventEmitter<boolean>;
  public update: boolean = false;

  constructor(
    private sqliteService: SqliteManagerService,
    private translate: TranslateService
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
}

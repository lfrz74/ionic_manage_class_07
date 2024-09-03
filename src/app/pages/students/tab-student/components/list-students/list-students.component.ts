import { Component, OnInit } from '@angular/core';

import { Student } from '../../../../../models/student';
import { SqliteManagerService } from '../../../../../services/sqlite-manager.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {
  public students!: Student[];
  public showForm: boolean;
  public studentSelected: Student;

  constructor(private sqliteService: SqliteManagerService) {
    this.showForm = false;
    this.students = [];
    this.studentSelected = new Student();
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

  onCloseForm() {
    this.showForm = false;
  }
}

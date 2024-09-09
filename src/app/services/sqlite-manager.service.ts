import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  capSQLiteChanges,
  capSQLiteValues,
  JsonSQLite,
} from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';

import { ToastService } from './toast.service';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class SqliteManagerService {
  public dbReady: BehaviorSubject<boolean>;
  private isWeb = false;
  private dbName: string | null = '';

  private readonly DB_SETUP_KEY = 'first_db_setup';
  private readonly DB_NAME_KEY = 'db_name';

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.dbReady = new BehaviorSubject(false);
  }

  async init() {
    const info = await Device.getInfo();
    const sqlite = CapacitorSQLite as any;

    if (info.platform == 'android') {
      try {
        await sqlite.requestPermissions();
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'No access to DB',
          message: "This app can't work without accessing to DB",
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else if (info.platform == 'web') {
      this.isWeb = true;
      await sqlite.initWebStore();
    }
    this.setupDatabase();
  }

  async setupDatabase() {
    const dbSetupDone = await Preferences.get({ key: this.DB_SETUP_KEY });

    if (!dbSetupDone.value) {
      this.downloadDatabase();
    } else {
      const dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({ database: dbName?.toString() });
      await CapacitorSQLite.open({ database: dbName?.toString() });

      this.dbReady.next(true);
    }
  }

  /* Ucta v este error me salió xq subscribe no soporta la promesa asincrona v
     tocó, usar Rxjs operators v, eso a pelo cuando v sin tu chatgpt */
  // downloadDatabase1() {
  //   this.http
  //     .get('assets/db/db.json')
  //     .subscribe(async (jsonExport: JsonSQLite) => {
  //       const jsonstring = JSON.stringify(jsonExport);
  //       const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

  //       if (isValid.result) {
  //         this.dbName = jsonExport.database;

  //         await CapacitorSQLite.importFromJson({ jsonstring });
  //         await CapacitorSQLite.createConnection({ database: this.dbName });
  //         await CapacitorSQLite.open({ database: this.dbName });

  //         await Preferences.set({ key: this.DB_SETUP_KEY, value: '1' });
  //         await Preferences.set({ key: this.DB_NAME_KEY, value: this.dbName });

  //         this.dbReady.next(true);
  //       }
  //     });
  // }

  downloadDatabase() {
    this.http
      .get<JsonSQLite>('assets/db/db.json')
      .pipe(
        switchMap(async (jsonExport: JsonSQLite) => {
          const jsonstring = JSON.stringify(jsonExport);
          const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

          if (isValid.result) {
            this.dbName = jsonExport.database;

            await CapacitorSQLite.importFromJson({ jsonstring });
            await CapacitorSQLite.createConnection({ database: this.dbName });
            await CapacitorSQLite.open({ database: this.dbName });

            await Preferences.set({ key: this.DB_SETUP_KEY, value: '1' });
            await Preferences.set({
              key: this.DB_NAME_KEY,
              value: this.dbName,
            });

            this.dbReady.next(true);
          }

          return of(null); // Return an observable to complete the pipe
        }),
        catchError((error) => {
          this.toastService.showToast(
            'top',
            `[downloadDatabase] Error: ${error}`,
            'danger'
          );
          return of(null); // Handle errors and complete the observable stream
        })
      )
      .subscribe();
  }

  async getDbName() {
    if (!this.dbName) {
      const dbName = await Preferences.get({ key: this.DB_NAME_KEY });
      this.dbName = dbName.value;
    }
    return this.dbName;
  }

  async getStudents(search?: string) {
    let sql = 'SELECT * FROM students WHERE active = 1';
    if (search) {
      sql += ` AND (UPPER(name) LIKE '%${search.toLocaleUpperCase()}%'
               OR UPPER(surname) LIKE '%${search.toLocaleUpperCase()}%')`;
    }

    const dbName = await this.getDbName();
    return CapacitorSQLite.query({
      database: dbName?.toString(),
      statement: sql,
    })
      .then((response: capSQLiteValues) => {
        let students: Student[] = [];
        if (response.values) {
          for (let index = 0; index < response.values.length; index++) {
            const row = response.values[index];
            let student = row as Student;
            students.push(student);
          }
        }
        return Promise.resolve(students);
      })
      .catch((error) => Promise.reject(error));
  }

  async createStudent(student: Student) {
    let sql =
      'INSERT INTO students(name, surname, email, phone) VALUES(?,?,?,?)';

    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName?.toString(),
      set: [
        {
          statement: sql,
          values: [student.name, student.surname, student.email, student.phone],
        },
      ],
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({
          database: dbName?.toString(),
        });
      }
      return changes;
    });
  }

  async updateStudent(student: Student) {
    let sql =
      'UPDATE students SET name=?, surname=?, email=?, phone=? WHERE id=?';

    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName?.toString(),
      set: [
        {
          statement: sql,
          values: [
            student.name,
            student.surname,
            student.email,
            student.phone,
            student.id,
          ],
        },
      ],
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({
          database: dbName?.toString(),
        });
      }
      return changes;
    });
  }

  async deleteStudent(student: Student) {
    let sql = 'UPDATE students SET active=0 WHERE id=?';

    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName?.toString(),
      set: [
        {
          statement: sql,
          values: [student.id],
        },
      ],
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({
          database: dbName?.toString(),
        });
      }
      return changes;
    });
  }
}

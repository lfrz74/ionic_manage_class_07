import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SqliteManagerService } from  '../app/services/sqlite-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isWeb = false;
  public load = false;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private sqliteService: SqliteManagerService
  ) {
    this.translate.setDefaultLang('en');
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(async () => {
      const language = await Device.getLanguageCode();
      const info = await Device.getInfo();

      this.isWeb = info.platform == 'web';

      if (language.value) {
        this.translate.use(language.value.slice(0, 2));
      }

      this.sqliteService.init();
      this.sqliteService.dbReady.subscribe((isReady) => {
        this.load = isReady;
      });
    });
  }
}

import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(async () => {
      const language = await Device.getLanguageCode();

      if (language.value) {
        this.translate.use(language.value.slice(0, 2));
      }
    });
  }
}

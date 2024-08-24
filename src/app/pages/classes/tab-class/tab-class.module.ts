import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabClassPage } from './tab-class.page';
import { TabClassPageRoutingModule } from './tab-class-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabClassPageRoutingModule
  ],
  declarations: [TabClassPage]
})
export class TabClassPageModule {}

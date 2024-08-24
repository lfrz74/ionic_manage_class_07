import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabPaymentPage } from './tab-payment.page';
import { TabPageRoutingModule } from './tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabPageRoutingModule
  ],
  declarations: [TabPaymentPage]
})
export class TabPaymentPageModule {}

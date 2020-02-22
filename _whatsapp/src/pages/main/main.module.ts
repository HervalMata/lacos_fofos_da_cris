import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MainPage} from './main';
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    SuperTabsModule,
  ],
})
export class MainPageModule {
}

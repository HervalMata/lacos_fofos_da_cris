import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {ChatMessagesPageModule} from "../pages/chat-messages/chat-messages/chat-messages.module";
import {AuthService} from "../../../_angular-app/src/app/services/auth.service";
import {SuperTabsModule} from "ionic2-super-tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginOptionsPage} from "../pages/login-options/login-options";
import {LoginPhoneNumberPage} from "../pages/login-phone-number/login-phone-number";
import {ResetPhoneNumberPage} from "../pages/reset-phone-number/reset-phone-number";
import {ChatGroupListComponent} from "../components/chat-group-list/chat-group-list";
import {CustomerCreatePage} from "../pages/customer-create/customer-create";
import {MainPage} from "../pages/main/main";
import {FirebaseAuthProvider} from "../providers/firebase-auth/firebase-auth";
import {CustomerHttpProvider} from "../providers/customer-http/customer-http";
import {AuthProvider} from "../providers/auth/auth";


function jwtFactory(authService: AuthService) {
  return {
    whitelistedDomains: [
      new RegExp('localhost:8000/*')
    ],
    tokenGetter: () => {
      return authService.getToken()
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    CustomerCreatePage,
    ChatGroupListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagesPageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    CustomerCreatePage,
    ChatGroupListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider
  ]
})
export class AppModule {
}

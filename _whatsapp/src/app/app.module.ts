import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatMessageHttpProvider } from '../providers/chat-message-http/chat-message-http';
import { CustomerHttpProvider } from '../providers/customer-http/customer-http';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseAuthProvider } from '../providers/firebase-auth/firebase-auth';
import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';
import { MainPage } from '../pages/main/main';
import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { LoginPhoneNumberPage } from '../pages/login-phone-number/login-phone-number';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { ChatMessagesPageModule } from '../pages/chat-messages/chat-messages/chat-messages.module';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LongPressModule } from "ionic-long-press";
import { Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";
import { AudioRecorderProvider } from '../providers/audio-recorder/audio-recorder';

function jwtFactory(authService: AuthProvider) {
  return {
    whitelistedDomains: [
      new RegExp('localhost:8000/*'),
      new RegExp('192.168.0.8:8000/*')
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
    LongPressModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthProvider]
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
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    Media,
    File,
    AudioRecorderProvider
  ]
})
export class AppModule {}

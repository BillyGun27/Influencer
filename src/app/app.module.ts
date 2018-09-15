import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SearchPage } from '../pages/search/search';
import { BuzzPage } from '../pages/buzz/buzz';
import { AccountPage } from '../pages/account/account';
import { AccountEditPage } from '../pages/account-edit/account-edit';
import { BuzzDetailPage } from '../pages/buzz-detail/buzz-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BuzzerProvider } from '../providers/buzzer/buzzer';


@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    BuzzPage,
    AccountPage,
    TabsPage,
    BuzzDetailPage, 
    SignupPage,
    LoginPage,
    AccountEditPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    BuzzPage,
    AccountPage,
    TabsPage,
    BuzzDetailPage,
    SignupPage, 
    LoginPage,
    AccountEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BuzzerProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera
  ]
})
export class AppModule {}

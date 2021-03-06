import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage:any = LoginPage;// TabsPage;

  constructor(platform: Platform, public storage: Storage ,statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.storage.get("loggedin")
    .then((loggedin) => {
     if(loggedin){
      this.rootPage =  TabsPage;
     }else{
      this.rootPage =  LoginPage;
     }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  
}

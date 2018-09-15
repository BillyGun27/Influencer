import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user : any;
  buzzer: any;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public storage: Storage ,public http: HttpClient) {
    this.user = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
   // console.log(this.user);
    
    
    this.toserver()
    .then(data => {
    //  console.log(data);
      this.buzzer = data;
      //console.log( this.buzzer.id);
      this.storage.set("profile" , this.buzzer.id );
      //console.log(this.storage.get("profile"));
      if(data == "User Not Found"){
        this.presentAlert();
      }else{
        this.navCtrl.push(TabsPage);
        this.storage.set("loggedin" , true );
      }
     
    });
    
    //
  }

  toserver() {
   // console.log(this.user);
  //  console.log(this.user.email)
    return new Promise(resolve => {
     // https://buzzer-api.azurewebsites.net
      this.http.post('https://buzzerapi.herokuapp.com/auth/login', 
      { 
        email: this.user.email,
        password:this.user.password
      })
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });

    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'User Not Found',
    });
    alert.present();
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}

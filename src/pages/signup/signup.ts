import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user : any;
  buzzer: any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams, public storage: Storage ,public http: HttpClient) {
    this.user = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {

    this.toserver()
    .then(data => {
    //  console.log(data);
      this.buzzer = data;
      //console.log( this.buzzer.id);
      this.storage.set("profile" , this.buzzer.id );
      //console.log(this.storage.get("profile"));
      if(data == "User Already Exist"){
        this.presentAlert('User Already Exist');
      }else{
        this.presentAlert('Anda Sudah Terdafdatar Silahkan Login untuk Masuk');
        this.navCtrl.push(LoginPage);
      }

    });

    console.log(this.user);
   // this.navCtrl.push(TabsPage);

  }

  toserver() {
    // console.log(this.user);
   //  console.log(this.user.email)
     return new Promise(resolve => {
 //https://buzzer-api.azurewebsites.net
       this.http.post('https://buzzerapi.herokuapp.com/auth/register', 
       { 
         email: this.user.email,
         name : this.user.name,
         password:this.user.password,
         status: this.user.status
       })
       .subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
 
     });
   }

   presentAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
    });
    alert.present();
  }



}

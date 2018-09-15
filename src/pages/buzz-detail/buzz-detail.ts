import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BuzzerProvider } from '../../providers/buzzer/buzzer';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the BuzzDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buzz-detail',
  templateUrl: 'buzz-detail.html',
})
export class BuzzDetailPage {
  selectedItem: any;
  followbutton: any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public buzzer: BuzzerProvider,public navParams: NavParams) {
    this.selectedItem = navParams.get('item');

    this.check();
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuzzDetailPage');
  }

  check(){
    this.buzzer.checkfollow(this.selectedItem.id)
    .then(data => {
      this.followbutton = data;
      console.log(this.followbutton);
    });
  }
  follow(){
    this.buzzer.setfollow(this.selectedItem.id)
    .then(data => {
   
      this.check();
      this.presentAlert(data);
    });
  }
  
  presentAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
    });
    alert.present();
  }

}

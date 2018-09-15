import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AccountEditPage } from '../account-edit/account-edit';
import { BuzzerProvider } from '../../providers/buzzer/buzzer';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
id:any
  items: any;
curitem:any;
  constructor(public storage: Storage,public navCtrl: NavController , public buzzer: BuzzerProvider) {
     
    this.buzzer.getdata()
      .then(data => {
        this.items = data;
        //console.log(this.items);
      });

      this.storage.get("profile")
      .then((profile) => {
        this.id = profile
        //console.log("prof");
        //console.log(profile);
        
      });

      this.SearchBuzzer();
  }

  ionViewWillEnter(){
    this.buzzer.getdata()
    .then(data => {
      this.items = data;
      //console.log(this.items);
    });

  }

  SearchBuzzer(){
    this.storage.get("profile")
    .then((profile) => {
      this.id = profile
      console.log("edit");
      console.log(profile);
      this.buzzer.setCurrentUser(this.buzzer.filterId(this.id));
      //this.user = this.buzzer.filterId(this.id);
     
      this.curitem = this.buzzer.getCurrentUser();
      console.log(this.curitem );
    });
    
  }

  edit() {
    this.navCtrl.push(AccountEditPage, {
      item: this.curitem[0]
    });
  }  

}

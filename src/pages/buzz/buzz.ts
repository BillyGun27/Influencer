import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuzzDetailPage } from '../buzz-detail/buzz-detail';

//import { Item } from '../../models/item';
import { BuzzerProvider } from '../../providers/buzzer/buzzer';

@Component({
  selector: 'page-buzz',
  templateUrl: 'buzz.html'
})
export class BuzzPage {
  icons: string[];
  items: any;//Array<{title: string, note: string, icon: string}>;
  //users: any;
  
  constructor(public navCtrl: NavController, public buzzer: BuzzerProvider) {
    /*
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/

    this.buzzer.getfollow()
    .then(data => {
      this.items = data;
     
      console.log("bezz");
      console.log(data);
    });
   
    //console.log("bezz");
    //console.log(this.items);
    //this.items = this.buzzer.query();
    //console.log("buzz");
    //console.log(this.items);
   // this.getUserData() ;
/*
   this.buzzer.getsample()
   .then(data => {
     this.items  = data;
     console.log("samp");
     console.log(data);
   });*/

  }

  ionViewWillEnter(){
    this.buzzer.getfollow()
    .then(data => {
      this.items = data;
      console.log("bezz");
      console.log(data);
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(BuzzDetailPage, {
      item: item
    });
  }

  /*
  getUserData() {
    
    this.buzzer.getdata()
    .then(data => {
      //this.users = data;
      console.log("bezz");
      console.log(data);
    });
 

   //this.users = this.buzzer.getSample();
  }*/
  

}

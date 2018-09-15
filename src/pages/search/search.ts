import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuzzDetailPage } from '../buzz-detail/buzz-detail';

//import { Item } from '../../models/item';
import { BuzzerProvider } from '../../providers/buzzer/buzzer';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  items:any;// Item[];
  buzzerSearch;

  constructor(public navCtrl: NavController, public buzzer: BuzzerProvider) {
    this.items = this.buzzer.query();
    this.buzzer.getdata()
    .then(data => {
      // this.items  = data;
      this.items = data;
      //console.log("samplesearch");
      console.log(this.items);
    });
    
    //console.log(this.buzzer.getsample());
    console.log("search");
  }

  ionViewWillEnter(){
    this.items = this.buzzer.query();
    console.log("search");
  }

  SearchBuzzer(){
    this.items = this.buzzer.filterItems(this.buzzerSearch);
  }

  itemTapped(event, item) {
    this.navCtrl.push(BuzzDetailPage, {
      item: item
    });
  }

}

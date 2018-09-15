import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

//import { Item } from '../../models/item';
/*
  Generated class for the BuzzerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuzzerProvider {
  icons: string[];
 // items: Array<{title: string, note: string, icon: string}>;
 items: any;//Item[] = [];
id:any;
 apiUrl = 'https://buzzerapi.herokuapp.com';////https://buzzer-api.azurewebsites.net
currentUser:any;
  constructor( public storage: Storage,public http: HttpClient) {

    /*
    console.log('Hello BuzzerProvider Provider');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push(
        new Item(
        {
        "title": 'Item ' + i,
        "note": 'This is item #' + i,
        "icon": this.icons[Math.floor(Math.random() * this.icons.length)]
      })
    );
    }*/

  
    
  /*  
    this.getsample()
    .then(data => {
      // this.items  = data;
      console.log("sample");
      console.log(data);
    });
*/
  }

  query(params?: any) {
    this.getdata()
    .then(data => {
       this.items  = data;
      console.log("coba");
      console.log(data);
    });

    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  filterItems(searchTerm){
 
    return this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }

  filterId(searchTerm){
 
    return this.items.filter((item) => {
        return item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }

  setCurrentUser(current){
    this.currentUser  = current;
  }
  getCurrentUser(){
    return this.currentUser;
  }

  getdata() {
    return new Promise(resolve => {

      this.http.get(this.apiUrl+'/buzz/view').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });

    });
  }


  getfollow() {
    //get all follower data
    //this.id =  this.storage.get( "profile");
    //console.log(this.storage.get( "profile"));
    console.log(this.id);
    return new Promise(resolve => {

      this.storage.get("profile")
    .then((profile) => {
      this.id = profile
      console.log("prof");
      console.log(profile);

      this.http.get(this.apiUrl+'/buzz/follow/'+this.id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
      
    });

     

    });

  }


setfollow(followid){
  //console.log(this.id);
  return new Promise(resolve => {

    this.storage.get("profile")
  .then((profile) => {
    //this.id = profile
    console.log("prof");
    console.log(profile);

    this.http.get(this.apiUrl+'/buzz/followuser/'+profile+'/'+followid).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
    
  });

   

  });
}

checkfollow(followid){
  //console.log(this.id);
  return new Promise(resolve => {

    this.storage.get("profile")
  .then((profile) => {
    //this.id = profile
    console.log("follow");
    console.log(profile);

    this.http.get(this.apiUrl+'/buzz/checkfollow/'+profile+'/'+followid).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
    
  });

   

  });
}




}

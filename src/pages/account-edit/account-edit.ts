import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { BuzzerProvider } from '../../providers/buzzer/buzzer';


import { Storage } from '@ionic/storage';

import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {
  id:any
  imageURI:any;
  imageFileName:any;
  user:any;
  //buzzer: any;
res;
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public navParams: NavParams ,
    private transfer: FileTransfer,
    private camera: Camera,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public buzzer: BuzzerProvider) {

      
      //this.SearchBuzzer();
      this.user=navParams.get('item');//this.buzzer.getCurrentUser();
      console.log("start");
      console.log ( navParams.get('item') );
     // console.log ( this.buzzer.getCurrentUser().email );
     this.imageFileName = "https://buzzerapi.herokuapp.com/profile/uploads/"+this.user.id+".jpg" ;
      /*
     this.user={
      email: "",
      name : "dada",
      job: "dfdfadv",
      youtube:"",
      instagram: "",
      facebook: "",
      twitter: "",
      phone : "",
      bio : "",
      follower :"",
      price : "",
     }
     */
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountEditPage');
  }
/*
  SearchBuzzer(){
    this.storage.get("profile")
    .then((profile) => {
      this.id = profile
      console.log("edit");
      console.log(profile);
      this.buzzer.setCurrentUser(this.buzzer.filterId(this.id));
      this.user = this.buzzer.getCurrentUser();
      console.log(this.buzzer.getCurrentUser());
    });
    
  }*/
 

  getImage() {
    this.imageFileName ="assets/imgs/logo.png" ;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'profile',
      fileName: this.user.id+'.jpg' ,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'https://buzzerapi.herokuapp.com/profile/uploads.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName ="https://buzzerapi.herokuapp.com/profile/uploads/"+this.user.id+".jpg" ;
      loader.dismiss();
      this.res= JSON.stringify(data) ;
      this.presentToast( JSON.stringify(data) + "Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  Submit(){
     
    this.toserver()
    .then(data => {
      console.log("submitted");
      console.log(data);
     // this.buzzer = data;
      //console.log( this.buzzer.id);
     // this.storage.set("profile" , this.buzzer.id );
      //console.log(this.storage.get("profile"));
     
      this.navCtrl.setRoot(AccountPage);
      this.navCtrl.popToRoot();
      //this.navCtrl.push(AccountPage);
    });

  }

  toserver() {
     console.log(this.user);
     console.log(this.user.name)
     return new Promise(resolve => {
 //
 //https://buzzer-api.azurewebsites.net
       this.http.post('https://buzzerapi.herokuapp.com/auth/update', 
       { 
         id : this.user.id,
         email: this.user.email,
         name : this.user.name,
         job: this.user.job,
         youtube: this.user.youtube,
         instagram: this.user.instagram,
         facebook: this.user.facebook,
         twitter: this.user.twitter,
         phone : this.user.phone,
         bio : this.user.bio,
         follower :this.user.follower,
         price : this.user.price,
       })
       .subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
 
     });
   }

}

import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

import { ToastController } from '@ionic/angular';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';



import {Downloader, DownloadRequest, NotificationVisibility} from '@ionic-native/downloader/ngx';
import { Plugins } from '@capacitor/core';
const { Camera, Filesystem, FilesystemDirectory } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  downloadUrl = '';
  myFiles=[];
  downloadProgress = 0;


  hasWriteAccess: boolean = false;
  ionViewWillEnter() {
    this.checkPermissions();
 }
 
 checkPermissions() {
    this.androidPermissions
    .checkPermission(this.androidPermissions
    .PERMISSION.WRITE_EXTERNAL_STORAGE)
    .then((result) => {
     console.log('Has permission?',result.hasPermission);
     this.hasWriteAccess = result.hasPermission;
   },(err) => {
       this.androidPermissions
         .requestPermission(this.androidPermissions
         .PERMISSION.WRITE_EXTERNAL_STORAGE);
    });
    if (!this.hasWriteAccess) {
      this.androidPermissions
        .requestPermissions([this.androidPermissions
        .PERMISSION.WRITE_EXTERNAL_STORAGE]);
    }
 }

  async downloadQR () {
    const filePermissions = await Filesystem.requestPermissions();
    const cameraPermissions = await Camera.requestPermissions();
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data: ', imageData);
    let data = imageData.split(',')[1];
    const base64Data = data;
    const fileName = `${new Date().getTime()}.jpeg`;
    const image = Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Documents,
    }).then(async res => {
      let toast = await this.toastCtrl.create({
        message: 'The QR Code is saved in your PhotoLibrary',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
    }, async err => {
        let toast = await this.toastCtrl.create({
          message: err,
          duration: 2000,
          position: 'top',
          color: 'danger'

        });
        toast.present();
    }
    );
  }
  private async _readAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return await this._convertBlobToBase64(blob);
  }
  private async _convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
  


  pdfUrl = 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf';
  videoUrl = 'https://file-examples-com.github.io/uploads/2017/04/file-example_MP4_640_3MG.mp4';
  imageUrl = 'https://file-examples-com.github.io/uploads/2017/10/file-example_PNG_1MB.png';











  types=[];
  segmentsPerRow;
  rows;
  currentSeg;
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    for(let i=0; i<this.types.length; i++){
      if (ev.detail.value == this.types[i].text){
        this.types[i].value=true;
        this.currentSeg = i;
      }
      else{
        this.types[i].value=false;
      }
    }
  }
  segmentChanged2(ev: any){
    console.log('Segment changed', ev.detail.value);
  }
  text='';
  website='';
  contact={};
  wifi='WIFI:S:My_SSID;T:WPA;P:key goes here;H:false';
  wifi_id='';
  wifi_t='';
  wifi_key='';
  wifi_h=false;
  wifiFn(){
    this.wifi = 'WIFI:T:' + this.wifi_t + ';S:' + this.wifi_id + ';P:' + this.wifi_key + ';H:' + this.wifi_h+";";
  }
  phone='tel: ';
  sms="sms:null &body=null";
  smsNum;
  smsMes;
  smsFn(){
    this.sms = "sms://"+this.smsNum+"?body="+this.smsMes;
    return this.sms;
  }
  instagram='https://instagram.com/';
  instagramAppend;
  instagramFn(){
    this.instagram='https://instagram.com/';

    this.instagram +=this.instagramAppend;
    return this.instagram;
  }
  phoneAppend;
  phoneFn(){
    this.phone = 'tel: ';
    this.phone +=this.phoneAppend;
    return this.phone;
  }
  facebookAppend;
  facebookFn(){
    this.facebook='fb://profile/';
    this.facebook +=this.facebookAppend;
    return this.facebook;
  }
  twitterAppend;
  twitterFn(){
    this.twitter='https://twitter.com/';
    this.twitter +=this.twitterAppend;
    return this.twitter;
  }
  paypalAppend;
  paypalFn(){
    this.paypal='https://www.paypal.me/';
    this.paypal +=this.paypalAppend;
    return this.paypal;
  }
  youtubeAppend;
  youtubeFn(){
    this.youtube='https://www.youtube.com/channel/';
    this.youtube +=this.youtubeAppend;
    return this.youtube;
  }
  pinterestAppend;
  pinterestFn(){
    this.pinterest ='https://www.pinterest.com/';
    this.pinterest +=this.pinterestAppend;
    return this.pinterest;
  }
  snapchatAppend;
  snapchatFn(){
    this.snapchat='https://www.snapchat.com/add/';
    this.snapchat +=this.snapchatAppend;
    return this.snapchat;
  }
  whatsappAppend;
  whatsappFn(){
    this.whatsapp='whatsapp://send?phone=';
    this.whatsapp +=this.whatsappAppend;
    return this.whatsapp;
  }
  whatsapp='whatsapp://send?phone=';
  email="mailto:null? cc=null &bcc=null &subject=null &body=null";
  emailAdd = '';
  emailCc = '';
  emailBcc = '';
  emailSub = '';
  emailMes = '';
  emailFn(){
    this.email = "mailto:this.emailAdd?cc&bcc&subject&body=this.emailMes";
    var a = this.emailAdd;
    var b = this.emailMes;
    var c = this.emailCc;
    var d = this.emailBcc;
    var e = this.emailSub;

    this.email = "mailto:"+a+"?cc=" + c + "&bcc=" + d + "&subject=" + e + "&body=" + b;

    return this.email;
  }
  calendar="http://www.google.com/calendar/event?action=TEMPLATE&text&dates&details&location";
  calendarTitle;
  calendarLocation;
  calendarLocation2;

  calendarStart;
  calendarEnd;
  calendarDes;
  calendarDes2;
  calendarFn(){
    this.calendarDes2 = this.calendarDes.replaceAll(' ','+');
    this.calendarLocation2 = this.calendarLocation.replaceAll(' ','+');
    this.calendar = "http://www.google.com/calendar/event?action=TEMPLATE&text="+"&details=" + this.calendarDes2.replaceAll('\n','%0A')+this.calendarTitle.replaceAll(' ','+')+ "&location="+this.calendarLocation2.replaceAll('\n','%0A')+"&dates="+this.calendarStart.replaceAll('-','').replaceAll(':','') + "00Z%2F" + this.calendarEnd.replaceAll('-','').replaceAll(':','') +"00Z"  ;
    return this.calendar;
  }
  twitter='https://twitter.com/';
  facebook='fb://profile/';
  youtube='https://www.youtube.com/channel/';
  paypal='https://www.paypal.me/';
  linkedin='';
  pinterest='https://www.pinterest.com/';
  skype='';
  snapchat='https://www.snapchat.com/add/';
  wechat='';
  url='';
  
  
  selectedName;

  selectionFn(selectedName){
    for(let i=0; i<this.types.length; i++){
      if(selectedName == this.types[i].name){
        this.types[i].value = true;

      }
      else{
        this.types[i].value = false;
      }
    }
  }






  qrData= '';
  scannedCode = '';
  elementType: 'url' | 'canvas' | 'image'="canvas";
  image:File=null;
  
  file:File=null;




  constructor(private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController, public fileChooser: FileChooser, public filePath: FilePath, public base64: Base64,
    private downloader: Downloader, private androidPermissions: AndroidPermissions) {
    
    this.segmentsPerRow = 7;
    this.types = [
      {name: "document-text", text:"Text",value:true, elementType: 'canvas'},//done 0
      {name: "link", text:"Website",value:false, elementType: 'url'},//done 1
      {name: "wifi", text:"Wi-Fi",value:false, elementType: 'canvas'},//done 2
      {name: "call", text:"Phone",value:false, elementType: 'canvas'},//done 3
      {name: "chatbox", text:"SMS",value:false, elementType: 'canvas'},//done 4
      {name: "logo-instagram", text:"Instagram",value:false, elementType: 'url'},//done 5
      {name: "logo-whatsapp", text:"WhatsApp",value:false, elementType: 'canvas'},//done 6
      ////My Additions
      {name: "mail", text:"Email",value:false, elementType: 'canvas'},//done 7
      {name: "calendar", text:"Calendar",value:false, elementType: 'canvas'},//done 8
      {name: "logo-twitter", text:"Twitter",value:false, elementType: 'url'},//done 9
      {name: "logo-facebook", text:"Facebook",value:false,elementType: 'url'},//done 10
      {name: "logo-youtube", text:"YouTube",value:false,elementType: 'url'},//done 11
      {name: "logo-paypal", text:"PayPal",value:false,elementType: 'url'},//done 12
      {name: "logo-linkedin", text:"LinkedIn",value:false,elementType: 'url'},//done 13
      {name: "logo-pinterest", text:"Pinterest",value:false,elementType: 'url'},//done 14
      {name: "logo-skype", text:"Skype",value:false,elementType: 'url'},//done 15
      {name: "logo-snapchat", text:"Snapchat",value:false,elementType: 'url'},//done 16
      {name: "logo-wechat", text:"WeChat",value:false,elementType: 'url'},//done 17
      {name:'add-circle', text:"URL",value:false,elementType: 'url'},//done 18
      {name:'image', text: 'Image',value:false,elementType: 'image'},
      {name:'document', text: 'File', value:false,elementType: 'file'}



    ];
    this.rows = Array.from(Array(Math.ceil(this.types.length / this.segmentsPerRow)).keys())

    
  }



  createQR(){
    console.log('Create called!');
  }

  scanQR(){
    console.log('Scan called!');
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData.text;
        
      }
    );
  }
  abc;
  

  download(){
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data: ', imageData);
    let data = imageData.split(',')[1];
    if (!this.hasWriteAccess) {
      this.checkPermissions();
    }
   

    this.base64ToGallery.base64ToGallery(data,
      {prefix: '_img', mediaScanner: true})
      .then(async res => {
        let toast = await this.toastCtrl.create({
          message: 'The QR Code is saved in your PhotoLibrary',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        toast.present();
      }, async err => {
          let toast = await this.toastCtrl.create({
            message: err,
            duration: 2000,
            position: 'top',
            color: 'danger'

          });
          toast.present();
      }
      );

  }
  
  addToTextField(strings){
    this.website+=strings;
  }
  inputName;
  inputNum;
  inputEmail;
  inputMemo;
  inputCompany;
  inputAddress
  inputJobTitle;
  createContact(){
    this.contact = {
      'Name: ': this.inputName,
      'Phone Number: ': this.inputNum,
      'Email: ': this.inputEmail,
      'Company: ': this.inputCompany,
      'Job Title: ': this.inputJobTitle,
      'Address: ': this.inputAddress,
      'Memo: ': this.inputMemo


    }
  }


  

  async downloads(){
    
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data: ', imageData);
    let data = imageData.split(',')[1];
    let todecode = atob(data);
    

    this.base64ToGallery.base64ToGallery(todecode, { prefix: '_img',mediaScanner: false }).then(
            res => alert('Saved image to gallery '+ JSON.stringify(res)),
            err => alert('Error saving image to gallery ' + JSON.stringify(err))
          );
    

    
  }
  

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {HttpClientModule} from '@angular/common/http';
import {Downloader} from '@ionic-native/downloader/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),    NgxQRCodeModule,HttpClientModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    BarcodeScanner,
    FilePath,
    FileChooser,
    Base64,
    Downloader,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

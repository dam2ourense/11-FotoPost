import { SubirPage } from './../pages/subir/subir';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//pipes
import { PipesModule } from '../pipes/pipes.module';

import { Camera} from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker'


//providers
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

export const firebaseConfig = {
  apiKey: "AIzaSyDSjxis5xdundmaYG4nlp5yUEYxMmAcQ1M",
  authDomain: "fotopost-a9e8c.firebaseapp.com",
  databaseURL: "https://fotopost-a9e8c.firebaseio.com",
  projectId: "fotopost-a9e8c",
  storageBucket: "fotopost-a9e8c.appspot.com",
  messagingSenderId: "38296775399"
};

@NgModule({
  declarations: [
    MyApp,
    SubirPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SubirPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}

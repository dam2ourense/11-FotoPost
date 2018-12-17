import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ToastController } from 'ionic-angular';


@Injectable()
export class CargaArchivoProvider {
  imagenes: ArchivoSubir[] =[];
  miurl: string;

  constructor(private toastCtrl:ToastController,
              private afDB:AngularFireDatabase) {
    ;
  }

  cargar_imagen_firebase(archivo:ArchivoSubir){
    let promesa = new Promise ( (resolve, reject)=>{
      this.mostrar_toast("Cargando...");
      let storageRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = 
        storageRef.child (`imagenesApp/${nombreArchivo}`)
                .putString(archivo.url,'base64', {contentType:'image/jpeg'});

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=> {}, //saber el % de subida
          (error)=>{  //manejo del error
            console.log("ERROR en la carga ");
            console.log(JSON.stringify(error));
            this.mostrar_toast(JSON.stringify(error));
            reject();
          },
          ()=>{ //todo BIEN
            console.log ("Archivo subido");
            this.mostrar_toast("Imagen cargada correctamente");
            //esto lo hacemos cuando tengamos el crear_registro_firebase()
            //en el string que antes tenía el binario del fichero, metemos ahora la URL
            uploadTask.snapshot.ref.getDownloadURL().then((u)=>{
              archivo.url = u;
              console.log("::::url:::" + archivo.url +":::");
              archivo.key = nombreArchivo;
              this.crear_registro_firebase(archivo);               
              }); 
              resolve(); //indicar en la promesa que todo fue bien            
          }
        )
    });
    return promesa;
  }

  private crear_registro_firebase(archivo:ArchivoSubir){
      console.log("registro firebase::::")
      console.log(JSON.stringify(archivo ));
      //podría hacerlo así y crearía un id aleatorio en Firebase
      //this.afDB.list("/post").push(archivo);
      this.afDB.object(`/post/${archivo.key}`).update(archivo); //son back ticks https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/template_strings
      //en la anterior podríamos completarla con una promesa .then(....) para saber si lo hace
      //pero vamos a suponer que lo hace
      this.imagenes.push(archivo);
    }

  mostrar_toast( mensaje: string ){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }

}

interface ArchivoSubir{
  titulo:string;
  url:string;
  key?:string;
}
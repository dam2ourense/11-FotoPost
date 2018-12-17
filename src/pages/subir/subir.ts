import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';





@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo:string ;
  imagenPreview:string;
  imagen64:string;

  constructor(private viewCtrl:ViewController,
              private camera:Camera,
              private imagePicker:ImagePicker,
              private carga:CargaArchivoProvider,
              private toastCtrl:ToastController) {
                this.titulo = ""; //hay que inicializar aki, si lo hacemos en la declaración da error en el [disabled] del botón
                this.imagenPreview="";
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  mostrar_camara(){
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData; //esto lo añadimos al crear_post()
     console.log("ok camara");
    }, (err) => {
     // Handle error
     console.log ("Error en camara:", JSON.stringify(err));
    });
  }

  seleccionar_foto(){

    let opciones: ImagePickerOptions ={
      quality: 100,
      height: 300,
      width: 300,
      outputType: 1, //0 URI, 1 base64
      maximumImagesCount: 1 //para seleccionar una sola imagen
    };
    console.log ("vamos a seleccionar");
    this.imagePicker.getPictures(opciones).then((results) => {
      //aunque tenemos una sola img hay que hacer bucle por compatibilidad con iOS
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imagenPreview = "data:image/jpeg;base64,"+ results[i];
          this.imagen64 = results[i]; //esto lo añadimos al crear_post()
      }
    }, (err) => {console.log ("Error en seleccion", JSON.stringify(err)) })
  }

  crear_post(){
    let archivo = {
      url: this.imagen64,
      titulo: this.titulo
    };
    this.carga.cargar_imagen_firebase(archivo).then(()=>this.cerrar_modal());
  }

  mostrar_toast( mensaje: string ){

    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();

}
}

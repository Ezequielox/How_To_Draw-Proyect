import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './service/authentication.service';
import { AngularFireAuth } from "@angular/fire/auth";

import { CrudService } from './service/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'HowToDraw ';
constructor(private crudService: CrudService, private _sanitizer: DomSanitizer, public angularFireAuth: AngularFireAuth, private authService: AuthenticationService,   private firestore: AngularFirestore){this.selectedVal = 'login';
this.isForgotPassword = false;}

  
video: any =  { url: "https://www.youtube.com/watch?v=H1_tU-WDFCs", } //Esto es para poner videos en nuestra página//




students: any;
studentTitulo: string;
studentURL: string;
studentDescripcion: String;

users: any;
usuarioUID: any;
usuarioRol: string;
usuarioName: string;

rolTitulo: string;


// Login E-main & google //
selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;




// CRUD //
ngOnInit() {
  this.crudService.read_Tutorial().subscribe(data => {

    this.students = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        Titulo: e.payload.doc.data()['Titulo'],
        URL: e.payload.doc.data()['URL'],
        Descripcion: e.payload.doc.data()['Descripcion'],
      };
    })
    console.log(this.students);

  });
}

CreateRecord() {
  let record = {};
  record['Titulo'] = this.studentTitulo;
  record['URL'] = this.studentURL;
  record['Descripcion'] = this.studentDescripcion;
  this.crudService.create_NewTutorial(record).then(resp => {
    this.studentTitulo = "";
    this.studentURL = "";
    this.studentDescripcion = undefined;
    console.log(resp);
  })
    .catch(error => {
      console.log(error);
    });
}

RemoveRecord(rowID) {
  this.crudService.delete_Tutorial(rowID);
}

EditRecord(record) {
  record.isEdit = true;
  record.EditTitulo = record.Titulo;
  record.EditURL = record.URL;
  record.EditDescripcion = record.Descripcion;
}

UpdateRecord(recordRow) {
  let record = {};
  record['Titulo'] = recordRow.EditTitulo;
  record['URL'] = recordRow.EditURL;
  record['Descripcion'] = recordRow.EditDescripcion;
  this.crudService.update_Tutorial(recordRow.id, record);
  recordRow.isEdit = false;
}


// VIDEOS PUBLICACIONES //
getVideoIframe(url) {
  var video, results;

  if (url === null) {
      return '';
  }
  results = url.match('[\\?&]v=([^&#]*)');
  video   = (results === null) ? url : results[1];

  return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}


// CREAR UNA TABLA USUARIOS //

verificacion = JSON.parse(localStorage.getItem('user'));
UID_user: any;

verificationUsers(){
if (this.verificacion){
  this.angularFireAuth.authState.subscribe(userResponse => {
    if (userResponse){
      this.UID_user = userResponse.uid;
      this.createUsers();
    }
  })
}
}

createUsers(){
  let record = {};
  record['UID'] = this.usuarioUID;
  record['Rol'] = this.usuarioRol;
  record['Nombre'] = this.usuarioName;
  this.crudService.create_NewUser(record).then(resp => {
    this.usuarioUID = this.UID_user;
    this.usuarioRol = "lector";
    this.usuarioName = "Carlos";
    console.log(resp);
  })
    .catch(error => {
      console.log(error);
    });
    
}

// PRUEBA
hello(){
  let record = {};
  //record['UID'] = this.usuarioUID; //
  //record['Rol'] = this.usuarioRol; // ERROR?
  //record['Nombre'] = this.usuarioName; //
  this.crudService.create_NewUser(record);
}



//opdateRecord(recordRow) {
  //let record = {};
  //record['UID'] = this.userUID;
  //record['Rol'] = this.userRol;
  //record['Nombre'] = this.userName;
  //this.crudService.update_Tutorial(recordRow.id, record);
  //recordRow.isEdit = false;
//}



}



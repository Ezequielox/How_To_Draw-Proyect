import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 

  create_NewTutorial(record) {
    return this.firestore.collection('Tutorial').add(record);
  }
 
  read_Tutorial() {
    return this.firestore.collection('Tutorial').snapshotChanges();
  }
 
  update_Tutorial(recordID,record){
    this.firestore.doc('Tutorial/' + recordID).update(record);
  }
 
  delete_Tutorial(record_id) {
    this.firestore.doc('Tutorial/' + record_id).delete();
  }

  // Crear un "Usuarios"
  create_NewUser(record) {
    return this.firestore.collection('Users').add(record);
  }

  read_User() {
    return this.firestore.collection('Users').snapshotChanges();
  }
}
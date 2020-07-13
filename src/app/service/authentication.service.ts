import { Injectable } from '@angular/core';
 
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 // Crear una clase "rol"


  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore
  ) {
    

     // this.angularFireAuth.authState.subscribe(userResponse => {
      // if (userResponse){
        /* Se llama a la funcion "this.AppComponent.CreateRecordUsers()" para guardar el uid del usuario en una tabla de la BDD junto a un rol por defecto de "lector" */

        // localStorage.setItem('user', JSON.stringify(userResponse));
        // localStorage.setItem('user', JSON.stringify(userResponse));
        //Lo primero es buscar el usuario en firestore, si este existe deberia traer el rol. En caso de que no exista deberia crear el usuario en firestore deberia asignarle el rol de un usuario normal.
        // return this.firestore.collection('Usuarios/' + userResponse.uid);
      
        
      // } else {
        // localStorage.setItem('user', null);
        
    // }
  //  })
  }
 
  

  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
 
  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }
 
  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }
 
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
 
  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }
 
 
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
 
  async  loginWithGoogle() {
    return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
 
 
}
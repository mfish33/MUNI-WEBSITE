import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserCredential } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get user$() {
    return this.afAuth.authState
  }

  constructor(private afAuth: AngularFireAuth) { }

  signOut() {
    this.afAuth.signOut()
  } 

  async signInEmail(email: string, password: string): Promise<UserCredential | string> {
    return this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      console.error(error)
      if (error.code == 'auth/wrong-password') {
        return 'Wrong password'
      }else if(error.code == 'auth/invalid-email'){
        return 'This email is not a valid email'
      }else if(error.code == 'auth/user-not-found'){
        return 'This email isn\'t registered'
      }else if(error.code == 'auth/user-disabled'){
        return 'Your account has been disabled'
      }else{
        return 'something went wrong'
      }
    })
  }

  async registerEmail(email: string, password: string): Promise<UserCredential | string>{
    return this.afAuth.createUserWithEmailAndPassword(email, password).catch(error => {
      console.error(error)
      if(error.code == 'auth/email-already-in-use'){
        return 'This email is already in use'
      }else if(error.code == 'auth/invalid-email'){
        return 'This email is not a valid email'
      }else if(error.code == 'auth/operation-not-allowed'){
        return 'This is not a valid way to register, contact the website admin'
      }else if(error.code == 'auth/weak-password'){
        return 'Choose a stronger password'
      }else{
        return 'Something went wrong'
      }
    })
  }

}
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

  async signInEmail(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      throw(error)
    })
  }

  async registerEmail(email: string, password: string): Promise<UserCredential>{
    return this.afAuth.createUserWithEmailAndPassword(email, password).catch(error => {
      throw(error)
    })
  }

  errorCode(error){
    switch(error.code){
      case 'auth/email-already-in-use' :
        return 'This email is already in use'
      case 'auth/invalid-email':
        return 'This email is not a valid email'
      case 'auth/operation-not-allowed':
        return 'This is not a valid way to register, contact the website admin'
      case 'auth/weak-password':
        return 'Choose a stronger password'
      case 'auth/wrong-password':
        return 'Wrong password'
      case 'auth/user-not-found':
        return 'This email isn\'t registered'
      case 'auth/user-disabled':
        return 'Your account has been disabled'
    }
    return 'something went wrong'
    }
}
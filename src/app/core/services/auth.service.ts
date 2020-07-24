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

  async signIn(email: string, password: string): Promise<UserCredential | string> {
    return this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      if (error.code == 'auth/wrong-password') {
        return 'Wrong password'
      }
      console.error(error)
    })
  }

  async registerEmail(email: string, password: string): Promise<UserCredential | string>{
    var userCred = this.afAuth.createUserWithEmailAndPassword(email, password).catch(error => {
      if(error.code == 'auth/email-already-in-use'){
        return 'This email is already in use'
      }else if(error.code == 'auth/invalid-email'){
        return 'This email is not a valid email'
      }else if(error.code == 'auth/operation-not-allowed'){
        console.log("Invalid sign up option used : email")
        return 'This is not a valid way to register, please contact the website admin'
      }else if(error.code == 'auth/weak-password'){
        return 'Please choose a stronger password'
      }
      console.error(error)
    })
    console.log("user registered, :" + email)
    return userCred
  }

}
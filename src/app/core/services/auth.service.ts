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

}
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserCredential } from '@firebase/auth-types';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private actionCodeSettings = { url: 'https://ripe-website-40a9a.web.app' }
  private googleProvider = new auth.GoogleAuthProvider()

  constructor(private afAuth: AngularFireAuth) { }

  get user$() {
    return this.afAuth.authState
  }

  async signInGoogle() {
    try {
      return await this.afAuth.signInWithPopup(this.googleProvider)
    } catch (e) {
      throw e
    }
  }

  public signOut() {
    this.afAuth.signOut()
  }


  public async signInEmail(email: string, password: string): Promise<UserCredential> {
   
    let userCred = await this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      throw (error)
    })
    if(!userCred.user.emailVerified){
      this.afAuth.signOut()
      throw {code: 'email-not-verified', message: 'The email has not been verified'}
    }
    return userCred
  }

  public async registerEmail(email: string, password: string): Promise<void> {
    try {
      let attempt = await this.afAuth.createUserWithEmailAndPassword(email, password)
      attempt?.user.sendEmailVerification(this.actionCodeSettings)
    } catch (err) {
      throw (err)
    }
    this.afAuth.signOut()
    return null;
  }

  public errorCode(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
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
      case 'email-not-verified':
        return 'Verify your account before logging in'
    }
    return 'something went wrong'
  }
}

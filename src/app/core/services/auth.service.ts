import { Injectable, isDevMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserCredential } from '@firebase/auth-types';
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase/app';
// Need to be able to use auth providers on "firebase"
import 'firebase/auth'
import { map } from 'rxjs/operators';
import SimpleCrypto from "simple-crypto-js"
import { RouterHistoryService } from './router-history.service';
import { Router } from '@angular/router';
import AuthShared from 'src/app/modules/auth/classes/AuthShared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTO_SIGN_IN_KEY = 'autoSignIn'
  private googleProvider = new firebase.auth.GoogleAuthProvider()
  private facebookProvider = new firebase.auth.FacebookAuthProvider()

  constructor(private afAuth: AngularFireAuth, private afs:AngularFirestore,private history:RouterHistoryService, private router:Router, private http:HttpClient) {
    // TODO: Implement getting birthdays with google and facebook accounts 
    // this.googleProvider.addScope('https://www.googleapis.com/auth/user.birthday.read')
    // this.facebookProvider.addScope('user_birthday');
  }

  get user$() {
    // need to allow facebook since email will always be unverified
    return this.afAuth.authState.pipe(map(user => user?.emailVerified || user?.photoURL.includes('facebook') ? user : null))
  }

  async signInGoogle(): Promise<UserCredential> {
    let attempt = await this.afAuth.signInWithPopup(this.googleProvider)
    return attempt
  }

  async signInFacebook() {
    let attempt = await this.afAuth.signInWithPopup(this.facebookProvider)
    console.log(attempt)
    return attempt
  }

  public signOut() {
    this.afAuth.signOut()
  }

  public async signInEmail(email: string, password: string): Promise<UserCredential> {
    let attempt:firebase.auth.UserCredential
    try {
      attempt = await this.afAuth.signInWithEmailAndPassword(email, password)
    } catch(e) {
      throw this.errorCode(e)
    }
    if(!attempt.user.emailVerified) {
      this.signOut()
      throw 'Please verify your email'
    }
    return attempt
  }

  public async registerEmail(email: string, password: string, name:string, age:number): Promise<void> {
    let attempt:firebase.auth.UserCredential
    try {
      attempt = await this.afAuth.createUserWithEmailAndPassword(email, password)
    } catch(e) {
      throw this.errorCode(e)
    }
    await attempt.user.updateProfile({
      displayName:name
    })
    this.afs.collection('users').doc(attempt.user.uid).set({
      name:name,
      age:age
    })
    const key = SimpleCrypto.generateRandom()
    const crypto = new SimpleCrypto(key)
    const history = this.history.getHistory()
    const redirectRoute = AuthShared.getRedirectRoute(history)
    localStorage.setItem(this.AUTO_SIGN_IN_KEY,JSON.stringify({
      email:email,
      password:crypto.encrypt(password),
      restorePoint:redirectRoute
    }))
    // Get host this way since it is easier than checking if I need port and for http vs https
    let host = window.location.toString().match(/[^\/]+\/\/[^\/]+\//)[0]
    let url = new URL(host)
    url.searchParams.append('key',key)
    await attempt.user.sendEmailVerification({
      url: url.toString()
    })
    this.signOut()
  }

  public async verifyEmailLogIn(key:string) {
    const data = localStorage.getItem(this.AUTO_SIGN_IN_KEY)
    if(!data) {
      console.error('Could not auto log in. Missing local storage data')
      return
    }
    const crypto = new SimpleCrypto(key)
    const userData = JSON.parse(data)
    const decryptPassword = crypto.decrypt(userData.password)
    try{
      this.router.navigateByUrl(userData.restorePoint)
      await this.signInEmail(userData.email,decryptPassword as string)
      localStorage.removeItem(this.AUTO_SIGN_IN_KEY)
    } catch(e) {
      console.error(e)
    }
  }

  private errorCode(error) {
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
      default:
        return 'something went wrong'
    } 
  }

  public submitFeedback(feedback:{
    name:string
    reason:string
    email:string
    body:string 
  }): Observable<Object> {
    const url = isDevMode() ? 'http://localhost:8080/ripe-website-40a9a/us-central1/sendFeedback' : 'https://us-central1-ripe-website-40a9a.cloudfunctions.net/sendFeedback'
    return this.http.post(url,feedback,{responseType:'text'})
  }

}
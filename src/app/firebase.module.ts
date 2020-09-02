import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


const firebaseConfig = {
    apiKey: "AIzaSyBnyiMSx5HHB5o9r30_3xKCmqp4H0A8RCM",
    authDomain: "ripe-website-40a9a.firebaseapp.com",
    databaseURL: "https://ripe-website-40a9a.firebaseio.com",
    projectId: "ripe-website-40a9a",
    storageBucket: "ripe-website-40a9a.appspot.com",
    messagingSenderId: "215013052713",
    appId: "1:215013052713:web:d5f5d4f678f22d01492738",
    measurementId: "G-S7Q19L7E10"
};

@NgModule({
    providers: [],
    imports: [AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule],
    declarations: [],
    exports: []
})
export class FirebaseModule {
    constructor(@Optional() @SkipSelf() parentModule: FirebaseModule) {
        if (parentModule) {
            throw new Error(
                'FirebaseModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}
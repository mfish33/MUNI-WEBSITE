import { NgModule, Optional, SkipSelf } from '@angular/core';

import { FooterComponent } from './footer/footer.component'
import { NavbarComponent } from './navbar/navbar.component'
import { ContentfulService } from './services/contentful.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module'
import { AuthService } from './services/auth.service';
import { ProgressTrackerService } from './services/progress-tracker.service';
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
  providers: [ContentfulService, AuthService, ProgressTrackerService],
  imports: [SharedModule, FontAwesomeModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule],
  declarations: [FooterComponent, NavbarComponent],
  exports: [FooterComponent, NavbarComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
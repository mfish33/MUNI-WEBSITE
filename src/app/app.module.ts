import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { HomeModule } from './modules/home/home.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { AboutModule } from './modules/about/about.module';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './firebase.module';
import { CourseTemplateModule } from './modules/course-template/course-template.module';
import { CourseOverviewModule } from './modules/course-overview/course-overview.module';
import { ComingSoonModule } from './modules/coming-soon/coming-soon.module';
import * as Hammer from 'hammerjs'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'


export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LessonModule,
    AboutModule,
    CourseTemplateModule,
    CourseTemplateModule,
    CourseOverviewModule,
    AuthModule,
    FirebaseModule,
    CourseTemplateModule,
    BrowserAnimationsModule,
    ComingSoonModule,
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [{
    provide:HAMMER_GESTURE_CONFIG,
    useClass:MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

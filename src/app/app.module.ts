import { BrowserModule } from '@angular/platform-browser';
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
    CourseOverviewModule,
    AuthModule,
    FirebaseModule,
    CourseTemplateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { HomeModule } from './modules/home/home.module';
import { CourseModule } from './modules/course/course.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { AboutModule } from './modules/about/about.module';



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
    CourseModule,
    AboutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

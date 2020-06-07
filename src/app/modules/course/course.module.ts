import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './components/course/course.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CourseModule { }

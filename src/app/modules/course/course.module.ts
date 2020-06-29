import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './components/course/course.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class CourseModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseTemplateComponent } from './components/course-template/course-template.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseBarItemComponent } from './components/course-bar-item/course-bar-item.component';

@NgModule({
  declarations: [CourseTemplateComponent, CourseBarItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class CourseTemplateModule { }

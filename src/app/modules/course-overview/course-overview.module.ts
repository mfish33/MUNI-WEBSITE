import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseOverviewComponent } from './components/course-overview/course-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [CourseOverviewComponent, CourseCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class CourseOverviewModule { }

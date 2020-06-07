import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './components/lesson/lesson.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [LessonComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LessonModule { }

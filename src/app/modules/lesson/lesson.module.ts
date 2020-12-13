import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './components/lesson/lesson.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { InvestingWidgetComponent } from './components/investing-widget/investing-widget.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LessonComponent, InvestingWidgetComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class LessonModule { }

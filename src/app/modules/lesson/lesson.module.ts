import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './components/lesson/lesson.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { InvestingWidgetComponent } from './components/investing-widget/investing-widget.component';
import { FormsModule } from '@angular/forms';
import { LivingExpensesLessonComponent } from './components/living-expenses-lesson/living-expenses-lesson.component';
import { InvestingLessonComponent } from './components/investing-lesson/investing-lesson.component';

@NgModule({
  declarations: [LessonComponent, InvestingWidgetComponent, LivingExpensesLessonComponent, InvestingLessonComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class LessonModule { }

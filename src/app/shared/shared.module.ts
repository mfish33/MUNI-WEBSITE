import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { ParallaxTitleComponent } from './components/parallax-title/parallax-title.component';
import { CourseBarItemComponent } from './components/course-bar-item/course-bar-item.component';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { FlowchartElementComponent } from './components/flowchart-element/flowchart-element.component';


@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [SafePipe, ParallaxTitleComponent, FlowchartComponent, FlowchartElementComponent, CourseBarItemComponent],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SafePipe,
    ParallaxTitleComponent,
    CourseBarItemComponent,
    FlowchartComponent
  ]
})
export class SharedModule { }
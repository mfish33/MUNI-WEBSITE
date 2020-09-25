import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { ParallaxTitleComponent } from './components/parallax-title/parallax-title.component';
import { FlowchartComponent } from './components/flowchart/flowchart.component';
import { FlowchartElementComponent } from './components/flowchart-element/flowchart-element.component';
import { QuickFeedbackComponent } from './components/quick-feedback/quick-feedback.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
    ],
  declarations: [SafePipe, ParallaxTitleComponent, FlowchartComponent, FlowchartElementComponent,QuickFeedbackComponent, BackgroundImageComponent,FooterComponent],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SafePipe,
    ParallaxTitleComponent,
    FlowchartComponent,
    QuickFeedbackComponent,
    BackgroundImageComponent,
    FooterComponent
  ]
})
export class SharedModule { }
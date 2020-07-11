import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { ParallaxTitleComponent } from './components/parallax-title/parallax-title.component';


@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [SafePipe, ParallaxTitleComponent],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SafePipe,
    ParallaxTitleComponent
  ]
})
export class SharedModule { }
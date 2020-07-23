import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AboutModule { }

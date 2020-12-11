import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AboutPageDesktopComponent } from './components/about-page-desktop/about-page-desktop.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutPageMobileComponent } from './components/about-page-mobile/about-page-mobile.component';


@NgModule({
  declarations: [AboutPageComponent,AboutPageDesktopComponent, AboutPageMobileComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AboutModule { }

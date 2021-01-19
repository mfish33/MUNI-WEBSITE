import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeDesktopComponent } from './components/home-desktop/home-desktop.component';
import { HomeMobileComponent } from './components/home-mobile/home-mobile.component';


@NgModule({
  declarations: [HomeComponent, HomeDesktopComponent, HomeMobileComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [ComingSoonComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class ComingSoonModule { }

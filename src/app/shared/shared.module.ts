import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';


@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [SafePipe],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SafePipe
  ]
})
export class SharedModule {}
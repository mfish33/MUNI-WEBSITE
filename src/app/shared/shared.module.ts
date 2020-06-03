import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
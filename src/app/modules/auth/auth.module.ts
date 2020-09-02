import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { GoogleSignInComponent } from './google-sign-in/google-sign-in.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FacebookSignInComponent } from './facebook-sign-in/facebook-sign-in.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, GoogleSignInComponent, FacebookSignInComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

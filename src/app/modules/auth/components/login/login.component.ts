import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms'
import Utils from 'src/app/shared/classes/Utils';
import {RouterHistoryService} from 'src/app/core/services/router-history.service'
import AuthShared from '../../classes/AuthShared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm:FormGroup
  public errorText:string

  constructor(private auth: AuthService,private fb:FormBuilder, private history:RouterHistoryService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:'',
      password:''
    },{
      validators:Validators.required
    })
  }

  public async submit() {
    if(!this.loginForm.valid) {
      return
    }
    try{
      await this.auth.signInEmail(this.loginForm.value.email, this.loginForm.value.password)
      const history = this.history.getHistory()
      const redirectRoute = AuthShared.getRedirectRoute(history)
      this.router.navigateByUrl(redirectRoute)
    } catch(e) {
      this.errorText = e
    }
  }

  public getEmailErrors() {
    return Utils.getEmailErrors(this.loginForm)
  }

}

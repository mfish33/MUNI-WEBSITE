import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators } from '@angular/forms'
import Utils from 'src/app/shared/classes/utils';
import {RouterHistoryService} from 'src/app/core/services/router-history.service'
import AuthShared from '../../classes/AuthShared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  public loginForm:FormGroup
  public errorText:string
  public backgroundRatio:number
  public windowRatio:number
  @ViewChild('background') backgroundImage: ElementRef

  constructor(private auth: AuthService,private fb:FormBuilder, private history:RouterHistoryService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:'',
      password:''
    },{
      validators:Validators.required
    })
  }

  ngAfterViewInit() {
    this.backgroundRatio = this.backgroundImage.nativeElement.naturalWidth /this.backgroundImage.nativeElement.naturalHeight
    if(isNaN(this.backgroundRatio)) {
      // Sometimes view does not fully init. Re-check after timeout.
      setTimeout(() => {
        this.backgroundRatio = this.backgroundImage.nativeElement.naturalWidth /this.backgroundImage.nativeElement.naturalHeight
      }, 50);
    }
    this.windowRatio = window.innerWidth / window.innerHeight
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowRatio = window.innerWidth / window.innerHeight
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

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/app/shared/classes/Utils';
import { RouterHistoryService } from 'src/app/core/services/router-history.service';
import { Router } from '@angular/router';
import AuthShared from '../../classes/AuthShared';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit,OnDestroy {
  public registerForm:FormGroup;
  public errorText:string
  private authSub:Subscription
  public backgroundRatio:number
  public windowRatio:number
  @ViewChild('background') backgroundImage: ElementRef

  constructor(private auth: AuthService, private fb:FormBuilder, private history:RouterHistoryService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:'',
      password:'',
      confirmPassword:'',
      age:null,
      name:'',
    },{
      validators:Validators.required
    })
    this.authSub = this.auth.user$.subscribe(user => {
      if(user) {
        const history = this.history.getHistory()
        const redirectRoute = AuthShared.getRedirectRoute(history)
        this.router.navigateByUrl(redirectRoute)
      }
    })
  }

  ngAfterViewInit() {
    this.backgroundRatio = this.backgroundImage.nativeElement.naturalWidth / this.backgroundImage.nativeElement.naturalHeight
    if(isNaN(this.backgroundRatio)) {
      // Sometimes view does not fully init. Re-check after timeout.
      setTimeout(() => {
        this.ngAfterViewInit()
      }, 50);
    }
    this.windowRatio = window.innerWidth / window.innerHeight
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowRatio = window.innerWidth / window.innerHeight
  }

  ngOnDestroy() {
    this.authSub.unsubscribe()
  }


  public async submit() {
    if(!this.registerForm.valid) {
      return
    }
    if (this.registerForm.value.confirmPassword != this.registerForm.value.password) {
      this.errorText = 'Passwords do not match'
      return
    }
    try {
      await this.auth.registerEmail(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name,this.registerForm.value.age)
      this.errorText = 'Please verify your email'
    } catch (e) {
      this.errorText = e
    }
  }

  public getEmailErrors() {
    return Utils.getEmailErrors(this.registerForm)
  }

}

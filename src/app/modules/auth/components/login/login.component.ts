import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  public email: string
  public password: string
  public showPassword: boolean
  public errorText: string

  private authSub: Subscription

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.auth.user$.subscribe(user => this.errorText = user?.email ? 'You are logged in' : '')
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  public async submit() {
    await this.auth.signInEmail(this.email, this.password).catch(error => this.errorText = this.auth.errorCode(error))
  }

}

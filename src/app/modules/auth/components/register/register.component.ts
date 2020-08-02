import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public email: string
  public password: string
  public confirmPassword: string
  public showPassword: boolean
  public errorText: string

  public authSub: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.auth.user$.subscribe(user => this.errorText = user?.email ? 'You are logged in' : '')
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  public async submit() {
    if (this.confirmPassword != this.password) {
      this.errorText = 'Passwords do not match'
      return
    }

    try {
      await this.auth.registerEmail(this.email, this.password)
    } catch (e) {
      this.errorText = this.auth.errorCode(e)
    }

  }

}

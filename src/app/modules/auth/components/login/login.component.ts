import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public email : string
  public password : string
  public showPassword : boolean
  public errorText : string

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public async submit() {
    this.errorText = ''
    var ret = await this.auth.signInEmail(this.email, this.password)
    if(typeof ret == 'string'){
      this.errorText = ret
    }else{
      this.errorText = 'You have been logged in'
    }
  }

}

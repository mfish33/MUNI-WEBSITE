import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})

export class RegisterComponent implements OnInit {

  public email : string
  public password : string
  public confirmPassword : string
  public showPassword : boolean
  public errorText : string

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public async submit() {
    if(this.confirmPassword == this.password){
      this.errorText = ''
      var ret = await this.auth.registerEmail(this.email, this.password).catch( error => this.errorText = this.auth.errorCode(error))
      if(this.errorText == ''){ this.errorText = 'Registration complete, please log in at the login page'}
    }else{
      this.errorText = 'Passwords do not match'
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { error } from 'protractor';


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
      var ret = await this.auth.registerEmail(this.email, this.password).catch( error => {this.errorText = this.auth.errorCode(error)})
      console.log(this.errorText)
      if(this.errorText == ''){ this.errorText = 'Registration and login complete'}
      console.log(this.errorText)
    }else{
      this.errorText = 'Passwords do not match'
    }
  }

}

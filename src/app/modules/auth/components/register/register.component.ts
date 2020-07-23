import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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

  public submit() {
    if(this.confirmPassword == this.password){
      this.errorText = ''
    }else{
      this.errorText = 'Passwords do not match'
    }
  }

}

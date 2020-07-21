import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public email
  public password
  public confirmPassword
  public showPassword

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public submit() {

  }

}

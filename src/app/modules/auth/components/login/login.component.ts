import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public email
  public password
  public showPassword

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public submit() {

  }

}

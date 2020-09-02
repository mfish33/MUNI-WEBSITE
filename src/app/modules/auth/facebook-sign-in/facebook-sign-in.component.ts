import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterHistoryService } from 'src/app/core/services/router-history.service';
import { Router } from '@angular/router';
import AuthShared from '../classes/AuthShared';

@Component({
  selector: 'app-facebook-sign-in',
  templateUrl: './facebook-sign-in.component.html',
  styleUrls: ['./facebook-sign-in.component.scss']
})
export class FacebookSignInComponent implements OnInit {

  constructor(private auth: AuthService, private history:RouterHistoryService, private router:Router) { }

  ngOnInit(): void {
  }

  public async submitFacebook() {
    try {
      await this.auth.signInFacebook();
      const history = this.history.getHistory()
      const redirectRoute = AuthShared.getRedirectRoute(history)
      this.router.navigateByUrl(redirectRoute)
    } catch (e) {
      console.error(e);
    }
  }

}

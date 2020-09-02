import { Component, OnInit } from '@angular/core';
import { RouterHistoryService } from './core/services/router-history.service';
import { AuthService } from './core/services/auth.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private history:RouterHistoryService, private auth:AuthService, private route: ActivatedRoute){}
  title = 'MUNI';

  ngOnInit() {
    document.addEventListener('DOMContentLoaded',() => {
      let autoSignInkey = this.route.snapshot.queryParamMap.get('key')
      if(autoSignInkey) {
        this.auth.verifyEmailLogIn(autoSignInkey)
      }
    })

  }
}

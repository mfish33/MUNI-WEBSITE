import { Component, OnInit } from '@angular/core';
import { RouterHistoryService } from './core/services/router-history.service';
import { AuthService } from './core/services/auth.service';
import { ActivatedRoute } from "@angular/router";
import { ContentfulService } from './core/services/contentful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Pull in history and contentful services to get them to start at app launch
  constructor(private history:RouterHistoryService, private auth:AuthService, private route: ActivatedRoute,private content:ContentfulService){}
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

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component'
import { ContentfulService } from './services/contentful.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module'
import { AuthService } from './services/auth.service';
import { ProgressTrackerService } from './services/progress-tracker.service';
import { RouterHistoryService } from './services/router-history.service';

@NgModule({
  providers: [ContentfulService, AuthService, ProgressTrackerService, RouterHistoryService],
  imports: [SharedModule, FontAwesomeModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
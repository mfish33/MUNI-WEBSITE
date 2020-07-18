import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FooterComponent } from './footer/footer.component'
import { NavbarComponent } from './navbar/navbar.component'
import { ContentfulService } from './services/contentful.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module'
import { AuthService } from './services/auth.service';
import { ProgressTrackerService } from './services/progress-tracker.service';



@NgModule({
  providers: [ContentfulService, AuthService, ProgressTrackerService],
  imports: [SharedModule, FontAwesomeModule],
  declarations: [FooterComponent, NavbarComponent],
  exports: [FooterComponent, NavbarComponent]
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
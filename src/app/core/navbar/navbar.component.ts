import { Component, OnInit } from "@angular/core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ContentfulService } from "../services/contentful.service";
import { CourseOrdered } from "../../shared/models/contentfulTypes";
import { AuthService } from "src/app/core/services/auth.service";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Component({
  selector: "app-core-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  faBars = faBars;
  courses: Promise<CourseOrdered[]>;

  public $user: Observable<firebase.User>;

  public toggles = {
    hamburgerIsActive: false,
    mobileSignInOptions: false,
    dropDowns: {
      tools: false,
      courses: false,
    },
  };

  constructor(private content: ContentfulService, public auth: AuthService) {}

  ngOnInit() {
    this.courses = this.content.getActiveCourses();
    this.$user = this.auth.user$;
    this.$user.subscribe((user) => console.log(JSON.stringify(user)));
  }

  resetAndCloseMobileNav() {
    this.toggles.hamburgerIsActive = false;
    this.toggles.mobileSignInOptions = false;
    for (let dropDown in this.toggles.dropDowns) {
      this.toggles.dropDowns[dropDown] = false;
    }
  }

  toggleMobileSubDropDown(target: string) {
    Object.keys(this.toggles.dropDowns)
      .filter((k) => k !== target)
      .forEach((dropDown) => (this.toggles.dropDowns[dropDown] = false));

    this.toggles.dropDowns[target] = !this.toggles.dropDowns[target];
  }

  toggleMobileDropDown() {
    let currentState = this.toggles.hamburgerIsActive;
    this.resetAndCloseMobileNav();
    this.toggles.hamburgerIsActive = !currentState;
  }

  async toggleSignIn() {
    let currentState = this.toggles.mobileSignInOptions;
    this.resetAndCloseMobileNav();
    this.toggles.mobileSignInOptions = !currentState;
  }
}

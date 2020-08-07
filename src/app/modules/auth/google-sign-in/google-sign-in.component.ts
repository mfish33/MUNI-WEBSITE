import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-google-sign-in",
  templateUrl: "./google-sign-in.component.html",
  styleUrls: ["./google-sign-in.component.scss"],
})
export class GoogleSignInComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  public async submitGoogle() {
    try {
      await this.auth.signInGoogle();
    } catch (e) {
      console.error(e);
    }
  }
}

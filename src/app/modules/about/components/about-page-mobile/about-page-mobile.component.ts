import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Profile } from 'src/app/shared/models/contentfulTypes';

@Component({
  selector: 'app-about-page-mobile',
  templateUrl: './about-page-mobile.component.html',
  styleUrls: ['./about-page-mobile.component.scss']
})
export class AboutPageMobileComponent implements OnInit {

  constructor(
    public content:ContentfulService
  ) { }

  public profiles$:Promise<Profile[]>
  public activeProfile = 0

  ngOnInit(): void {
    this.profiles$ = this.content.getProfiles()
  }

}

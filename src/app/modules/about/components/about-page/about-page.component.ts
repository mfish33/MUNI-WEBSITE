import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Profile } from 'src/app/shared/models/contentfulTypes';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  personal$: Promise<Profile[]>

  constructor(public content: ContentfulService) { }

  ngOnInit(): void {
    this.personal$ = this.content.getProfiles()
  }

}

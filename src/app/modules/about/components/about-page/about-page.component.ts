import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Profile } from 'src/app/shared/models/contentfulTypes';
import {FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  personal$: Promise<Profile[]>
  feedback:FormGroup

  constructor(public content: ContentfulService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.feedback = this.fb.group({
      name:'',
      email:'',
      reason:'',
      body:''
    })
    this.personal$ = this.content.getProfiles()
  }

}

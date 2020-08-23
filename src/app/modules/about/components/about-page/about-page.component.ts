import { Component, OnInit, isDevMode } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Profile } from 'src/app/shared/models/contentfulTypes';
import {FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  personal$: Promise<Profile[]>
  feedback:FormGroup
  thankYou = false

  constructor(public content: ContentfulService,private fb: FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
    this.feedback = this.fb.group({
      name:'',
      email:'',
      reason:'',
      body:''
    },{
      validators:Validators.required
    })
    this.personal$ = this.content.getProfiles()
  }

  submitFeedback() {
    if(!this.feedback.valid) {
      console.log('invalid')
      return
    }
    this.thankYou = true
    const url = isDevMode() ? 'http://localhost:8080/ripe-website-40a9a/us-central1/sendFeedback' : 'https://us-central1-ripe-website-40a9a.cloudfunctions.net/sendFeedback'
    this.http.post(url,this.feedback.value)
    .subscribe((res:any) => {
      if(res?.status !== 200) {
        console.error('Error submitting feedback')
      }
    })
  }
  
  getEmailErrors() {
    let errors = this.feedback.get('email').errors
    if(errors) {
      if(errors.email) {
        return 'Please enter a valid email'
      }
      return 'Required *'
    }
  }
}

import { Component, OnInit, isDevMode, AfterViewInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Profile } from 'src/app/shared/models/contentfulTypes';
import {FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import Utils from 'src/app/shared/classes/Utils';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit,AfterViewInit {

  personal$: Promise<Profile[]>
  feedback:FormGroup
  thankYou = false
  private fragment: string;

  constructor(public content: ContentfulService,private fb: FormBuilder,private http:HttpClient,private route: ActivatedRoute, private auth:AuthService) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      this.ngAfterViewInit() 
    });
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

  async ngAfterViewInit(): Promise<void> {
    if(this.fragment == 'feedback') {
      await this.personal$
      // timeout is to allow content to render
      setTimeout(() => {
        window.scrollTo(0,document.body.scrollHeight);  
      },10)
      
    }
  }

  public submitFeedback() {
    if(!this.feedback.valid) {
      return
    }
    this.thankYou = true
    this.auth.submitFeedback(this.feedback.value)
    .subscribe((res:any) => {
      if(res?.status !== 200) {
        console.error('Error submitting feedback')
      }
    })
  }

  public getEmailErrors() {
    return Utils.getEmailErrors(this.feedback)
  }
}

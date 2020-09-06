import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger,transition,style,animate } from '@angular/animations';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-quick-feedback',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({
            transform: 'translate(10%,10%)', 
            opacity: 0,
          }),
          animate('200ms', style({
            transform: 'translate(0,0)', 
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            transform: 'translate(0,0)',
             opacity: 1
            }),
          animate('200ms', style({
            transform: 'translate(10%,10%)', 
            opacity: 0
          }))
        ])
      ]
    ),
    trigger(
      'fadeIn', [
        transition(':enter', [
          style({
            opacity: 0,
          }),
          animate('200ms', style({ 
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
             opacity: 1
            }),
          animate('200ms', style({
            opacity: 0
          }))
        ])
      ]
    )
  ],
  templateUrl: './quick-feedback.component.html',
  styleUrls: ['./quick-feedback.component.scss']
})
export class QuickFeedbackComponent implements OnInit {

  public quickFeedBack:FormGroup
  public showForm = false
  public thankYou = false
  public $user:Observable<firebase.User>
  @Input('location') reportingLocation:string

  constructor(private fb:FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.quickFeedBack = this.fb.group({
      email:'',
      body:''
    })
    this.$user = this.auth.user$
  }

  submitFeedback() {
    if(!this.quickFeedBack.value.body) {
      return
    }
    this.$user.pipe(take(1)).subscribe(user => {
      this.auth.submitFeedback({
        email: user ? user.email : this.quickFeedBack.value.email || 'QUICK FEEDBACK',
        name: user ? user.displayName : 'QUICK FEEDBACK',
        reason: this.reportingLocation,
        body: this.quickFeedBack.value.body
      }).subscribe((res:any) => {
        this.quickFeedBack.reset()
        if(res?.status && res?.status !== 200) {
          console.error('Error submitting feedback',res)
        }
      })
    })
    this.thankYou = true
    this.showForm = false
  }

}

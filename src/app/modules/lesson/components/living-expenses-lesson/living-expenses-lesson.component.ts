import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Course, CourseOrdered, defaultPageSettings, LivingExpensesLesson } from 'src/app/shared/models/contentfulTypes';

@Component({
  selector: 'app-living-expenses-lesson',
  templateUrl: './living-expenses-lesson.component.html',
  styleUrls: ['./living-expenses-lesson.component.scss']
})
export class LivingExpensesLessonComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean
  public pageSettings: LivingExpensesLesson['pageSettings']

  
  private authSub: Subscription

  constructor(
    public content: ContentfulService,
    private auth: AuthService
  ) { }

  @Input() lesson:LivingExpensesLesson
  @Input() nextLesson:LivingExpensesLesson
  @Input() courseId: string
  @Input() nextCourse: CourseOrdered | undefined

  ngOnInit(): void {
    this.authSub = this.auth.user$.subscribe(user => this.isAuthenticated = !!user)
    this.pageSettings = this.lesson.pageSettings || defaultPageSettings;
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  goToSpreadSheet() {
    if (!this.isAuthenticated) {
      return
    }
    window.open('https://docs.google.com/spreadsheets/d/15djg2Hxzp1BfpWw3OUiHDFuemVTRdjDZqNVd9GslWK0/edit#gid=213958007')
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Lesson, defaultPageSettings } from 'src/app/shared/models/contentfulTypes';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, OnDestroy {
  public lesson$: Promise<Lesson>
  public nextLesson: Lesson

  public courseId: string
  public lessonId: string

  private authSub: Subscription
  public isAuthenticated: boolean

  public pageSettings: Lesson['fields']['pageSettings']

  constructor(
    private activeRoute: ActivatedRoute,
    public content: ContentfulService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.authSub = this.auth.user$.subscribe(user => this.isAuthenticated = !!user)
    this.activeRoute.params.subscribe((params) => {
      this.courseId = params.cid
      this.lessonId = params.lid
      this.content.getLesson(this.courseId, this.lessonId).then(lesson => {
        if (!lesson) {
          this.router.navigateByUrl('')
        }
        this.lesson$ = Promise.resolve(lesson)
        this.pageSettings = lesson.fields.pageSettings || defaultPageSettings;
        this.nextLesson = this.content.getNextLesson(this.courseId, this.lessonId)
      })
    })

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

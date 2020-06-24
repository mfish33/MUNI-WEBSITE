import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Lesson, defaultPageSettings } from 'src/app/shared/models/contentfulTypes';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  public lesson$: Promise<Lesson>
  public nextLesson: Lesson

  public courseId: string
  public lessonId: string

  public pageSettings: Lesson['fields']['pageSettings']

  constructor(
    private activeRoute: ActivatedRoute,
    public content: ContentfulService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.courseId = params.cid
      this.lessonId = params.lid
      console.log(params.cid, params.lid)
      this.lesson$ = this.content.getLesson(this.courseId, this.lessonId)
      this.lesson$.then(lesson => {
        if (!lesson) {
          this.router.navigateByUrl('')
        }
        this.pageSettings = lesson.fields.pageSettings || defaultPageSettings;
        console.log(this.pageSettings.whatDoINeedToKnowAlt)
        this.nextLesson = this.content.getNextLesson(this.courseId, this.lessonId)
        console.log(this.nextLesson)
      })
      this.lesson$.then(console.log)
    })

  }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Lesson, defaultPageSettings, isInvestingLesson, InvestingLesson, LivingExpensesLesson, Course, CourseOrdered } from 'src/app/shared/models/contentfulTypes';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  public lesson$: Promise<InvestingLesson | LivingExpensesLesson>
  public nextLesson: LivingExpensesLesson | InvestingLesson

  public isInvestingLesson = isInvestingLesson

  public courseId: string
  public nextCourse: CourseOrdered | undefined

  constructor(
    private activeRoute: ActivatedRoute,
    public content: ContentfulService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(async (params) => {
      this.courseId = params.cid
      let lessonId = params.lid
      let lesson = await this.content.getLesson(this.courseId, lessonId)
      if (!lesson) {
        this.router.navigateByUrl('')
      }
      this.lesson$ = Promise.resolve(lesson.fields)
      this.nextLesson = this.content.getNextLesson(this.courseId, lessonId)?.fields
      let activeCourses = await this.content.getActiveCourses()
      let currentIdx = activeCourses.map(c => c.id).indexOf(this.courseId)
      this.nextCourse = activeCourses[currentIdx + 1]
    })

  }


  

}

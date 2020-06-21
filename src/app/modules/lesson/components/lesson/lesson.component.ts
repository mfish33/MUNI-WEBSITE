import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Lesson, defaultPageSettings } from 'src/app/shared/models/contentfulTypes';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  private blurMax = 8
  private titleOpacityDefault = 100
  private imgHeightOffset = .5

  public courseId: string
  public lessonId: string
  public lesson$: Promise<Lesson>
  public nextLesson: Lesson
  public blur = this.blurMax
  public titleOpacity = this.titleOpacityDefault
  public pageSettings: Lesson['fields']['pageSettings']

  constructor(
    private activeRoute: ActivatedRoute,
    private content: ContentfulService,
    private router: Router
  ) { }

  get blurImageAmount() {
    return `blur(${this.blur}px);`
  }

  @ViewChild('titleImg', { static: false }) titleImg: ElementRef;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    let scrollHeight = window.pageYOffset
    let imgHeight = this.titleImg.nativeElement.offsetHeight
    let effectiveImageHeight = imgHeight - this.imgHeightOffset * imgHeight
    this.blur = this.blurMax - this.blurMax * scrollHeight / effectiveImageHeight
    this.titleOpacity = this.titleOpacityDefault - this.titleOpacityDefault * scrollHeight / effectiveImageHeight

  }

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

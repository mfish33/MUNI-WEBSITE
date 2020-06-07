import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute, private content:ContentfulService, private router:Router) { }

  public courseId:string
  public lessonId:string
  public lesson$:Promise<Lesson>
  public nextLesson:Lesson

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.courseId = params.cid
      this.lessonId = params.lid
      console.log(params.cid,params.lid)
      this.lesson$ = this.content.getLesson(this.courseId,this.lessonId)
      this.lesson$.then(lesson => {
        if(!lesson) {
          this.router.navigateByUrl('')
        }
        this.nextLesson = this.content.getNextLesson(this.courseId,this.lessonId)
        console.log(this.nextLesson)
      })
      this.lesson$.then(console.log)
    })
  }

}

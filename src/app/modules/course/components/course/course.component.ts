import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Course } from 'src/app/shared/models/contentfulTypes';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, public content: ContentfulService, private router: Router) { }

  public courseId: string
  public course$: Promise<Course>

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.course$ = this.content.getCourse(params.cid)
      this.course$.then(course => {
        if (!course) {
          this.router.navigateByUrl('')
        }
      })
      this.course$.then(console.log)
      this.courseId = params.cid
    })
  }

}

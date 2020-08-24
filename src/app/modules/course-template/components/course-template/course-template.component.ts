import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Course, CourseOrdered } from 'src/app/shared/models/contentfulTypes';

@Component({
  selector: 'app-course-template',
  templateUrl: './course-template.component.html',
  styleUrls: ['./course-template.component.scss']
})
export class CourseTemplateComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, public content: ContentfulService, private router: Router) { }

  public courseId: string;
  public course$: Promise<Course>
  public nextCourse: null | CourseOrdered

  ngOnInit() {
    this.activeRoute.params.subscribe(async (params) => {
      this.courseId = params.cid
      let course = await this.content.getCourse(this.courseId)
      if (!course) {
        this.router.navigateByUrl('');
      }
      this.course$ = Promise.resolve(course)
      let activeCourses = await this.content.getActiveCourses()
      let currentIdx = activeCourses.map(c => c.courseTitle).indexOf(course.courseTitle)
      this.nextCourse = activeCourses[currentIdx + 1]
    });
  }
}

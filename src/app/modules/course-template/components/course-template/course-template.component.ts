import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Course } from 'src/app/shared/models/contentfulTypes';

@Component({
  selector: 'app-course-template',
  templateUrl: './course-template.component.html',
  styleUrls: ['./course-template.component.scss']
})
export class CourseTemplateComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, public content: ContentfulService, private router: Router) { }

  public courseId: string;
  public course$: Promise<Course>

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.courseId = params.cid
      this.content.getCourse(this.courseId).then(course => {
        this.course$ = Promise.resolve(course)
        if (!course) {
          this.router.navigateByUrl('');
        }
      });
    });
  }
}

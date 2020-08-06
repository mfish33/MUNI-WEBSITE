import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { CourseOrdered } from 'src/app/shared/models/contentfulTypes';


@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  courses: Promise<CourseOrdered[]>;

  constructor(private activeRoute: ActivatedRoute, public content: ContentfulService, private router: Router) { }

  ngOnInit(): void {
    this.courses = this.content.getCoursesByOrder();
  }
}

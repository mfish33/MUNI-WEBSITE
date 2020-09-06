import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { CourseOrdered } from '../../models/contentfulTypes';


@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit {

  public flowChart$: Promise<CourseOrdered[]>
  @Input() parentCourseName: string

  constructor(public content: ContentfulService) { }

  ngOnInit(): void {
    this.flowChart$ = this.content.getCoursesByOrder()
  }

  public isCurrent(course:CourseOrdered): boolean {
    return course.courseTitle == this.parentCourseName
  }

  public getName(course:CourseOrdered): string {
    return course.shortName || course.courseTitle
  }

}
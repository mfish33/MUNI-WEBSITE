import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { CourseOrdered } from '../../models/contentfulTypes';


@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit {

  public flowChart$: Promise<flowChartElm[]>
  @Input() parentCourseName: string

  constructor(private content: ContentfulService) { }

  ngOnInit(): void {
    this.flowChart$ = this.content.getCoursesByOrder().then(courses => courses.map((course: CourseOrdered) => {
      return {
        name: course.shortName ? course.shortName : course.courseTitle,
        img: this.content.getAsset(course.flowchartImg),
        current: course.courseTitle == this.parentCourseName
      }
    })
    )
  }

}

interface flowChartElm {
  name: string
  img: string
  current: boolean
}

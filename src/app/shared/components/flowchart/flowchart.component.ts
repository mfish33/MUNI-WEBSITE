import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { Course } from '../../models/contentfulTypes';


@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit {

  public flowChart$: Promise<flowChartElm[]>

  constructor(private content: ContentfulService) { }

  ngOnInit(): void {
    this.flowChart$ = this.content.getCoursesNoId().then(courses => courses.map((course: Course) => {
      return {
        name: course.courseTitle,
        img: this.content.getAsset(course.flowchartImg)
      }
    })
    )
  }

}

interface flowChartElm {
  name: string
  img: string
}

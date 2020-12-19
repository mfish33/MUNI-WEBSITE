import { Component, OnInit,Input } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { InvestingLesson } from 'src/app/shared/models/contentfulTypes';

@Component({
  selector: 'app-investing-lesson',
  templateUrl: './investing-lesson.component.html',
  styleUrls: ['./investing-lesson.component.scss']
})
export class InvestingLessonComponent implements OnInit {

  @Input() lesson:InvestingLesson

  constructor(
    public content:ContentfulService
  ) { }

  ngOnInit(): void {
  }

}

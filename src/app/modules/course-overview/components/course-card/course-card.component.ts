import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful.service';
import { CourseOrdered } from 'src/app/shared/models/contentfulTypes';
import { RichTextContent } from 'contentful';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: CourseOrdered;

  constructor(public content: ContentfulService) { }

  ngOnInit(): void {
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-bar-item',
  templateUrl: './course-bar-item.component.html',
  styleUrls: ['./course-bar-item.component.scss']
})
export class CourseBarItemComponent implements OnInit {

  @Input() imgUrl: string;
  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }
}

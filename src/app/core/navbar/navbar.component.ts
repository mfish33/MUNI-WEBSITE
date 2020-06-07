import { Component, OnInit } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { ContentfulService } from '../services/contentful.service';
import { Course } from '../../shared/models/course'


@Component({
  selector: 'app-core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faUser=faUser
  faBars=faBars
  courses:Promise<[string,Course][]>

  constructor(private content:ContentfulService) { }

  ngOnInit() {
    this.courses = this.content.getCourses()
  }

}

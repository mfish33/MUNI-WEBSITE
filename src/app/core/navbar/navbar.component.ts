import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { ContentfulService } from '../services/contentful.service';
import { CourseOrdered } from '../../shared/models/contentfulTypes'


@Component({
  selector: 'app-core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faUser = faUser
  faBars = faBars
  courses: Promise<CourseOrdered[]>

  // Template Toggles
  public hamburgerIsActive: boolean
  public mobileSignInOptions: boolean
  public navDrop1: boolean
  public navDrop2: boolean

  constructor(private content: ContentfulService) { }

  ngOnInit() {
    this.courses = this.content.getCoursesByOrder()
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBarItemComponent } from './course-bar-item.component';

describe('CourseBarItemComponent', () => {
  let component: CourseBarItemComponent;
  let fixture: ComponentFixture<CourseBarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseBarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

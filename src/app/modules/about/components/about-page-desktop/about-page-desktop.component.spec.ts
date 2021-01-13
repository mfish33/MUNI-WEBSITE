import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageDesktopComponent } from './about-page-desktop.component';

describe('aboutPageDesktopComponent', () => {
  let component: AboutPageDesktopComponent;
  let fixture: ComponentFixture<AboutPageDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPageDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

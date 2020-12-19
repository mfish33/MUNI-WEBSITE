import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageMobileComponent } from './about-page-mobile.component';

describe('AboutPageMobileComponent', () => {
  let component: AboutPageMobileComponent;
  let fixture: ComponentFixture<AboutPageMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPageMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

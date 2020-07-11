import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxTitleComponent } from './parallax-title.component';

describe('ParallaxTitleComponent', () => {
  let component: ParallaxTitleComponent;
  let fixture: ComponentFixture<ParallaxTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

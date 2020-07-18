import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowchartElementComponent } from './flowchart-element.component';

describe('FlowchartElementComponent', () => {
  let component: FlowchartElementComponent;
  let fixture: ComponentFixture<FlowchartElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowchartElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowchartElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

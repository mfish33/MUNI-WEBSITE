import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookSignInComponent } from './facebook-sign-in.component';

describe('FacebookSignInComponent', () => {
  let component: FacebookSignInComponent;
  let fixture: ComponentFixture<FacebookSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

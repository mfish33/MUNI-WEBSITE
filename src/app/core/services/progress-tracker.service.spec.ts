import { TestBed } from '@angular/core/testing';

import { ProgressTrackerService } from './progress-tracker.service';

describe('ProgressTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressTrackerService = TestBed.get(ProgressTrackerService);
    expect(service).toBeTruthy();
  });
});

import { ProgressTrackerService } from './progress-tracker.service';
import { Course } from 'src/app/shared/models/contentfulTypes';

const testCourse: Course = {
  courseImage: {} as any,
  courseTitle: 'Test Course',
  courseDescription: {} as any,
  lessons: ['', '', '', ''] as any
}

const testCourse2: Course = {
  courseImage: {} as any,
  courseTitle: 'Test Course2',
  courseDescription: {} as any,
  lessons: ['', '', '', ''] as any
}

const lids = ['12345', '67890']

describe('ProgressTrackerService', () => {
  let service: ProgressTrackerService;
  beforeEach(() => {
    localStorage.removeItem('courseProgress')
    service = new ProgressTrackerService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a visited lesson', () => {
    service.hasVisited(testCourse, lids[0])
    console.log(service.progressReport())
    expect(service.progressReport()).toEqual({
      'Test Course': .25
    })
  })

  it('Work with multiple courses', () => {
    service.hasVisited(testCourse, lids[0])
    service.hasVisited(testCourse, lids[1])
    service.hasVisited(testCourse2, lids[0])
    expect(service.progressReport()).toEqual({
      'Test Course': .5,
      'Test Course2': .25
    })
  })

  it('should not double count already visited lessons', () => {
    service.hasVisited(testCourse, lids[1])
    service.hasVisited(testCourse, lids[1])
    expect(service.progressReport()).toEqual({
      'Test Course': .25
    })
  })


});

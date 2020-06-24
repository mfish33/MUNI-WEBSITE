import { Injectable } from '@angular/core';
import { Course } from 'src/app/shared/models/contentfulTypes';


@Injectable({
  providedIn: 'root'
})
export class ProgressTrackerService {

  private readonly localStorageKey = 'courseProgress'
  private progress: progress

  constructor() {
    let storedData = localStorage.getItem(this.localStorageKey)
    this.progress = storedData ? JSON.parse(storedData) : {}
  }

  public hasVisited(course: Course, lid: string): void {
    if (this.progress[course.courseTitle]) {
      if (this.progress[course.courseTitle].lessons.indexOf(lid) != -1) {
        // Lesson has already been stored
        return
      }
      this.progress[course.courseTitle].lessons.push(lid)
    } else {
      this.progress[course.courseTitle] = {
        lessons: [lid],
        total: course.lessons.length
      }
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.progress))
  }

  public progressReport(): report {
    let report = {}
    for (let courseName in this.progress) {
      report[courseName] = this.progress[courseName].lessons.length / this.progress[courseName].total
    }
    return report
  }


}

interface progress {
  [cid: string]: {
    lessons: string[]
    total: number
  }
}

interface report {
  [courseTitle: string]: number
}
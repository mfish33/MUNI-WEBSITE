import { Injectable } from '@angular/core';
import { Course } from 'src/app/shared/models/contentfulTypes';


@Injectable({
  providedIn: 'root'
})
export class ProgressTrackerService {

  private readonly localStorageKey = 'courseProgress'
  private progress: progress
  private cache: report = null

  constructor() {
    let storedData = localStorage.getItem(this.localStorageKey)
    this.progress = storedData ? JSON.parse(storedData) : {}
  }

  public hasVisited(course: Course, lid: string): void {
    this.cache = null
    let name = course.shortName ?? course.courseTitle
    if (this.progress[name]) {
      if (this.progress[name].lessons.indexOf(lid) != -1) {
        // Lesson has already been stored
        return
      }
      this.progress[name].lessons.push(lid)
    } else {
      this.progress[name] = {
        lessons: [lid],
        total: course.lessons.length
      }
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.progress))
  }

  public progressReport(): report {
    if (this.cache) {
      return this.cache
    }
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
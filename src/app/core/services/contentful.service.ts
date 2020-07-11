import { Injectable } from '@angular/core';
import * as contentful from 'contentful'
import { Lesson, LessonLink, Course, CourseOrder, CourseOrdered } from '../../shared/models/contentfulTypes'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { ProgressTrackerService } from './progress-tracker.service';

//TODO: Optimize calls by having a retrieve back end so it is not doing Object.entries on every call to async functions like getLesson


@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = contentful.createClient({
    space: 'pgd3q0zwi7n7',
    accessToken: 'MpxlqfzcO85iWmjFGzkw1ReoCVE6SNND5voSU0PQKpk'
  })

  // Local Cache for content. Clears on app reload
  private content: { [key: string]: Course } = {}

  constructor(private progress: ProgressTrackerService) {
    this.getCourses()
  }

  public async getCourses(): Promise<[string, Course][]> {
    if (Object.keys(this.content).length == 0) {
      try {
        let res: contentful.EntryCollection<CourseOrder> = await this.client.getEntries({ content_type: 'courseOrder', include: 10 })
        // put index of course onto course object
        // Should only be one course order item at a time
        let courseOrder = res.items[0]
        this.content = courseOrder.fields.courses.reduce((acc, course, i) => {
          course.fields.idx = i
          acc[course.sys.id] = course.fields
          return acc
        }, {})

      } catch (e) {
        console.error(e)
      }
    }
    return Object.entries(this.content)
  }

  public async getCoursesNoId(): Promise<Course[]> {
    if (Object.keys(this.content).length == 0) {
      await this.getCourses()
    }
    return Object.values(this.content)
  }

  public async getCoursesByOrder(): Promise<CourseOrdered[]> {
    await this.getCourses()
    return Object.entries(this.content).reduce((acc, val) => {
      let [id, course] = val
      let adjCourse = Object.assign(course, { id: id }) as CourseOrdered
      acc.push(adjCourse)
      return acc
    }, [])
  }


  public getLessonLinks(courseId: string): LessonLink[] {
    try {
      return this.content[courseId].lessons
    } catch (e) {
      console.error('Could not find the specified lessons from givin Course', e)
    }
  }

  public getNextLesson(courseId: string, lessonId: string): Lesson {
    try {
      let courseLength = this.content[courseId].lessons.length
      let newIndex = this.content[courseId].lessons.map(lessonLink => lessonLink.fields.lesson.sys.id).indexOf(lessonId) + 1
      return newIndex < courseLength ? this.content[courseId].lessons[newIndex].fields.lesson : null

    } catch (e) {
      console.error('Error in getNextArticle Function. Incorrect ids', e)
    }
  }

  public getAllLessons(): Lesson[] {
    return Object.values(this.content).map(course => course.lessons.map(lessonLink => lessonLink.fields.lesson)).reduce((allLessons, lessons) => {
      for (let lesson of lessons) {
        allLessons.push(lesson)
      }
      return allLessons
    }, [])
  }

  public async getCourse(id: string): Promise<Course> {
    await this.getCourses()
    return this.content[id]
  }

  public async getLesson(cid: string, lid: string): Promise<Lesson> {
    await this.getCourses()
    try {
      let lessonIndex = this.content[cid].lessons.map(lessonLink => lessonLink.fields.lesson.sys.id).indexOf(lid)
      if (lessonIndex == -1) {
        throw new Error('Invalid Lesson Id')
      }
      let course = await this.getCourse(cid)
      this.progress.hasVisited(course, lid)
      return this.content[cid].lessons[lessonIndex].fields.lesson
    } catch (e) {
      console.error('Lesson Could not be found', e)
    }
  }


  public convertRichText(doc): string {
    return documentToHtmlString(doc)
  }

  public getAsset(asset: contentful.Asset): string {
    return `https:${asset.fields.file.url}`
  }


}

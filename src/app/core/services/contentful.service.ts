import { Injectable } from '@angular/core';
import * as contentful from 'contentful'
import { Lesson, LessonLink, Course, CourseOrder, CourseOrdered, Profile, ProfileList, isInvestingLesson } from '../../shared/models/contentfulTypes'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { ProgressTrackerService } from './progress-tracker.service';


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

  private aboutProfiles: Profile[] = []

  constructor(private progress: ProgressTrackerService) {
    this.ensureCourses()
  }

  public async getCoursesByOrder(): Promise<CourseOrdered[]> {
    await this.ensureCourses()
    return Object.entries(this.content).reduce((acc, val) => {
      let [id, course] = val
      let adjCourse = Object.assign(course, { id: id }) as CourseOrdered
      acc.push(adjCourse)
      return acc
    }, [])
  }

  public async getActiveCourses(): Promise<CourseOrdered[]> {
    let courses = await this.getCoursesByOrder()
    return courses.filter(c => c.isActive);
  }

  public getLessonLinks(courseId: string): LessonLink[] {
    try {
      return this.content[courseId].lessons
    } catch (e) {
      console.error('Could not find the specified lessons from given Course', e)
    }
  }
  
  public async getCourse(courseId: string): Promise<Course> {
    await this.ensureCourses()
    return this.content[courseId]
  }

  public async getLesson(courseId: string, lessonId: string): Promise<Lesson> {
    await this.ensureCourses()
    let lessonIndex = this.content[courseId].lessons.map(lessonLink => lessonLink.fields.lesson.fields.titleURLNormalized).indexOf(lessonId)
    if (lessonIndex == -1) {
      throw new Error('Invalid Lesson Id')
    }
    let course = await this.getCourse(courseId)
    this.progress.hasVisited(course, lessonId)
    return this.content[courseId].lessons[lessonIndex].fields.lesson
  }
  
  public getNextLesson(courseId: string, lessonId: string): Lesson {
    let courseLength = this.content[courseId].lessons.length
    let newIndex = this.content[courseId].lessons.map(lessonLink => lessonLink.fields.lesson.fields.titleURLNormalized).indexOf(lessonId) + 1
    return newIndex < courseLength ? this.content[courseId].lessons[newIndex].fields.lesson : null
  }

  public convertRichText(doc): string {
    let options = {
      renderNode: {
        'embedded-asset-block': (node) =>
          `<div class="imgCenter"><img src="${node.data.target.fields.file.url}"/></div>`
      }
    }
    return documentToHtmlString(doc,options)
  }

  public getAsset(asset: contentful.Asset): string {
    let url = asset?.fields?.file?.url
    if (url) {
      return `https:${asset.fields.file.url}`
    }
    return ''
  }

  public async getProfiles(): Promise<Profile[]> {
    await this.ensureProfiles()
    return this.aboutProfiles
  }

  private async ensureCourses(): Promise<void> {
    if (Object.keys(this.content).length) {
      return
    }
    try {
      let res: contentful.EntryCollection<CourseOrder> = await this.client.getEntries({ content_type: 'courseOrder', include: 10 })
      // put index of course onto course object
      // Should only be one course order item at a time
      let courseOrder = res.items[0]
      this.content = courseOrder.fields.courses.reduce((acc, course, i) => {
        course.fields.idx = i
        course.fields.lessons.map(lesson => {
          let lessonBody = lesson.fields.lesson.fields
          if(isInvestingLesson(lessonBody)) {
            lesson.fields.lesson.fields.titleURLNormalized = this.normalizeURLNames(lessonBody.Title)
          } else {
            lesson.fields.lesson.fields.titleURLNormalized = this.normalizeURLNames(lessonBody.titleText)
          }   
        })
        acc[this.normalizeURLNames(course.fields.courseTitle)] = course.fields
        return acc
      }, {})
    } catch (e) {
      console.error('error fetching educational content',e)
    }
  }

  private async ensureProfiles(): Promise<void> {
    if (this.aboutProfiles.length != 0) {
      return
    }
    try {
      let res: contentful.EntryCollection<ProfileList> = await this.client.getEntries({ content_type: 'personnelOrder', include: 10 })
      // Should only be one personal list in conetentful
      this.aboutProfiles = res.items[0].fields.people
    } catch (e) {
      console.error('Could not fetch about us profiles',e)
    }
  }

  private normalizeURLNames(input:string):string {
    let custom = input.replace(/ /g,'_')
    return encodeURI(custom)
  }

}

import { Injectable } from '@angular/core';
import * as contentful from 'contentful'
import { Course } from '../../shared/models/course'
import { Lesson } from 'src/app/shared/models/lesson';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
  private assets:object

  constructor() {
    this.getCourses()
   }

  public async getCourses() : Promise<[string,Course][]> {
    if (Object.keys(this.content).length == 0) {
      try {
        let res = await this.client.getEntries({ content_type: 'courseOverviewPageTemplate' })
        this.content = res.items.reduce((acc, item) => {
          acc[item.sys.id] = item.fields
          return acc
        }, {})
      } catch (e) {
        console.error(e)
      }
    }
    return Object.entries(this.content)
  }


  public getLessons(courseId: string) : Lesson[] {
    try {
      return this.content[courseId].lessonLinks
    } catch (e) {
      console.error('Could not find the specified articles from givin Course', e)
    }
  }

  public getNextLesson(courseId: string, articleId) : Lesson {
    try{
      let articleLength = this.content[courseId].lessonLinks.length
      let newIndex = this.content[courseId].lessonLinks.map(article => article.sys.id).indexOf(articleId) + 1
      return newIndex < articleLength ? this.content[courseId].lessonLinks[newIndex] : null
      
    } catch(e) {
      console.error('Error in getNextArticle Function. Incorrect ids',e)
    }
  }
  
  public getAllLessons() : Lesson[] {
    return Object.values(this.content).map(course => course.lessonLinks).reduce((allArticles,courseArticles) => {
      for(let article of courseArticles) {
        allArticles.push(article)
      }
      return allArticles
    },[])
  }

  public async getCourse(id:string) : Promise<Course> {
    await this.getCourses()
    return this.content[id]
  }

  public async getLesson(cid:string,lid:string) : Promise<Lesson> {
    await this.getCourses()
    try{
      let lessonIndex = this.content[cid].lessonLinks.map(l => l.sys.id).indexOf(lid)
      if(lessonIndex == -1) {
        throw new Error('Invalid Lesson Id')
      }
      return this.content[cid].lessonLinks[lessonIndex]
    } catch(e) {
      console.error('Lesson Could not be found',e)
    }
  }
  

  public convertRichText(doc) : string {
    return documentToHtmlString(doc)
  }

  public async getAsset(id:string):Promise<contentful.Asset | void>{
    return this.client.getAsset(id).catch(e=>console.error('Error retrieving asset',e))
  }
  


}

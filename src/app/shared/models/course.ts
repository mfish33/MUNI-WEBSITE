import { Lesson } from './lesson'

export interface Course {
    courseTitle:string
    lessonLinks:Lesson[]
    courseTitleGraphic:object
}

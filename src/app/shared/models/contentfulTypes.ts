import { Sys, RichTextContent, Asset } from 'contentful'

export interface Course {
    courseImage: Asset
    courseTitle: string
    shortName?: string
    courseDescription: RichTextContent
    lessons: LessonLink[]
    flowchartImg: Asset
    idx: number
}

export interface CourseOrdered extends Course {
    id: string
}

export interface CourseExt {
    fields: Course
    sys: Sys
}

export interface CourseOrder {
    courses: CourseExt[]
}

export interface LessonLink {
    sys: Sys
    fields: {
        lessonTitle: string
        lessonDescription: RichTextContent
        LessonPreviewPicture: Asset
        lesson: Lesson
    }
}

export interface Lesson {
    sys: Sys
    fields: {
        titleText: string
        titleGraphic: Asset
        introduction: RichTextContent
        introductionInfographic: Asset
        introVideo: string
        introVideoCaption: RichTextContent
        goalsListField: string[]
        whatDoINeedToKnow: RichTextContent
        whatDoINeedToKnowInfographic: Asset
        whereDoIStart: string[]
        whereDoIStartMedia: Asset[]
        tipsTricksTitle: string
        dos: RichTextContent
        donts: RichTextContent
        summary: RichTextContent
        sources: RichTextContent
        spreadsheetSettings: {
            url: string | string[]
            range: string[]
        }
        pageSettings?: {
            whatDoINeedToKnowAlt: boolean
        }
    }
}

export const defaultPageSettings: Lesson['fields']['pageSettings'] = {
    whatDoINeedToKnowAlt: false
}
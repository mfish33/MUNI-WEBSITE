import { Sys, RichTextContent, Asset } from 'contentful'

export interface Course {
    courseImage: Asset
    courseTitle: string
    courseDescription: RichTextContent
    lessons: LessonLink[]
    lessonLinks: Lesson[]
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
import { Sys, RichTextContent, Asset } from 'contentful'

// Might be using types incorrectly because you might not have to make fields/sys manually
// Need to investigate further. Some types missing sys/fields because of the type they are 
// designated as in the contentful service

export interface Course {
    courseImage: Asset
    previewImage: Asset;
    courseTitle: string
    shortName?: string
    courseDescription: RichTextContent
    previewDescription: RichTextContent;
    lessons: LessonLink[]
    flowchartImg: Asset
    idx: number;
    isActive: boolean;
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
        lessonPreviewImg: Asset
        lesson: Lesson
    }
}

export interface Lesson {
    sys: Sys
    fields: {
        titleText: string
        titleURLNormalized:string
        titleGraphic: Asset
        introduction: RichTextContent
        introductionInfographic: Asset
        introVideo: string
        introVideoCaption: RichTextContent
        goalsListField: string[]
        whatDoINeedToKnow: RichTextContent
        whatDoINeedToKnowInfographic: Asset
        wdintkText2?: RichTextContent
        wdintkImg2?: Asset
        whereDoIStart: string[]
        whereDoIStartMedia: Asset[]
        tipsTricksTitle: string
        dos: RichTextContent
        donts: RichTextContent
        summary: RichTextContent
        sources: RichTextContent
        pageSettings?: {
            whatDoINeedToKnowAlt: boolean
        }
    }
}

export const defaultPageSettings: Lesson['fields']['pageSettings'] = {
    whatDoINeedToKnowAlt: false
}

export interface ProfileList {
    people: Profile[]
}

export interface Profile {
    sys: Sys
    fields: {
        nameOfPerson: string
        pictureOfPerson: Asset
        positionTitle: string
        linkedInUrl:string
    }

}
import { Injectable } from '@angular/core';
import { Course } from 'src/app/shared/models/contentfulTypes';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressTrackerService {

  private readonly localStorageKey = 'courseProgress'
  public progress: progress
  private uid: string | null = null
  public progressReport = new BehaviorSubject<report>({})

  constructor(private auth:AuthService, private afs:AngularFirestore) {
    let storedData = localStorage.getItem(this.localStorageKey)
    this.progress = storedData ? JSON.parse(storedData) : {}
    this.auth.user$.subscribe((user) => this.handleUserChange(user))
  }

  private async handleUserChange(user:firebase.User) {
    if(!user) {
      this.uid = null
      return
    }
    this.uid = user.uid
    let userInfo = await this.afs.collection('users').doc(user.uid).get().toPromise()
    if(!userInfo.exists || !userInfo.get('progress')) {
      this.afs.collection('users').doc(user.uid).set({
        progress:this.progress
      }, {merge:true})
      return
    }
    let userProgress:progress = userInfo.get('progress')

    // merge progress if different
    Object.keys(userProgress)
    .filter(key => this.progress[key])
    .forEach(key => {
      if(this.progress[key].lessons.length > userProgress[key].lessons.length) {
        userProgress[key].lessons = this.progress[key].lessons
      }
    })
    this.progress = Object.assign(this.progress,userProgress)

    // Incase there is changes update the user progress
    this.afs.collection('users').doc(user.uid).set({
      progress:this.progress
    },{merge:true})
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.progress))
    this.generateProgressReport()
  }

  public hasVisited(course: Course, lid: string): void {
    let name = course.shortName ?? course.courseTitle
    if (this.progress[name]) {
      if (this.progress[name].lessons.indexOf(lid) != -1) {
        // Lesson has already been stored
        return
      }
      this.progress[name].lessons.push(lid)
      this.progress[name].total = course.lessons.length
    } else {
      this.progress[name] = {
        lessons: [lid],
        total: course.lessons.length
      }
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.progress))
    this.syncUser()
    this.generateProgressReport()
  }

  private syncUser() {
    if(!this.uid) {
      return
    }
    this.afs.collection('users').doc(this.uid).set({
      progress:this.progress
    },{merge:true})
  }

  public generateProgressReport(): void {
    let report = {}
    for (let courseName in this.progress) {
      report[courseName] = this.progress[courseName].lessons.length / this.progress[courseName].total
    }
    this.progressReport.next(report)
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
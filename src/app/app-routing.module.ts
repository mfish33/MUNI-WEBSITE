import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { CourseComponent } from './modules/course/components/course/course.component';
import { LessonComponent } from './modules/lesson/components/lesson/lesson.component';
import { LoginComponent } from './modules/auth/components/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lessons/:cid/:lid', component: LessonComponent },
  { path: 'courses/:cid', component: CourseComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
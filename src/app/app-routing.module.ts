import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { CourseComponent } from './modules/course/components/course/course.component';
import { LessonComponent } from './modules/lesson/components/lesson/lesson.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lessons/:cid/:lid', component: LessonComponent },
  { path: 'courses/:cid', component: CourseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
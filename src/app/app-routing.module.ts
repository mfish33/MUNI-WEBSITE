import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { CourseTemplateComponent } from './modules/course-template/components/course-template/course-template.component';
import { LessonComponent } from './modules/lesson/components/lesson/lesson.component';
import { AboutPageComponent } from './modules/about/components/about-page/about-page.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { CourseOverviewComponent } from './modules/course-overview/components/course-overview/course-overview.component'
import { AuthGuard } from './core/guards/auth.guard';
import { ComingSoonComponent } from './modules/coming-soon/components/coming-soon/coming-soon.component';
import { InvestingWidgetComponent } from './modules/lesson/components/investing-widget/investing-widget.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseOverviewComponent },
  { path: 'lessons/:cid/:lid', component: LessonComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'courses/:cid', component: CourseTemplateComponent },
  { path: 'tools', component:ComingSoonComponent},
  { path: 'tools/:name', component:ComingSoonComponent},
  { path: 'widgetTest', component:InvestingWidgetComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

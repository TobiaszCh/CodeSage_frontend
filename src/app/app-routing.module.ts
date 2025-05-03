import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./components/course/course.component";
import { SubjectComponent } from "./components/subject/subject.component";
import { AnswerSessionComponent } from "./components/answer-session/answer-session.component";
import { LoginComponent } from "./components/login/login.component";


const routes: Routes = [
    //CourseComopnent -> CoursesComponent
    //SubjectComponent -> CourseDetailsComponent url: chcemy id
    // /course/5
    // /answersession/315
    { path: 'courses', component: CourseComponent },
    { path: 'courses/:courseId', component: SubjectComponent},
    { path: 'answer-session/:answerSessionId', component: AnswerSessionComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'courses', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
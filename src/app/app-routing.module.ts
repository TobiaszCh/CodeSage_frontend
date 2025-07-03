import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { SubjectComponent } from "./subject/subject.component";
import { AnswerSessionComponent } from "./answer-session/answer-session.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { authGuard } from "./auth-guard/auth.guard";


const routes: Routes = [
    //CourseComopnent -> CoursesComponent
    //SubjectComponent -> CourseDetailsComponent url: chcemy id
    // /course/5
    // /answersession/315
    { path: 'courses', component: CourseComponent, canActivate: [authGuard]},
    { path: 'courses/:courseId', component: SubjectComponent},
    { path: 'answer-session/:answerSessionId', component: AnswerSessionComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegistrationComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { SubjectComponent } from "./subject/subject.component";
import { AnswerSessionComponent } from "./answer-session/answer-session.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { authGuard } from "./auth-guard/auth.guard";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthComponent } from "./auth/auth.component";
import { ManageQuestionComponent } from "./question-management/question-management.component";


const routes: Routes = [
    {
      path: '',
      component: AuthComponent,
      children: [
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegistrationComponent},
        { path: '' , redirectTo: 'login', pathMatch: 'full'}
      ]
    },
    {         
      path: '',
      component: NavbarComponent,
      children: [
        { path: 'courses', component: CourseComponent, canActivate: [authGuard]},
        { path: 'courses/:courseId', component: SubjectComponent},
        { path: 'subjects/:subjectId/questions/new', component: ManageQuestionComponent}
      ]
    },
    { 
      path: 'answer-session/:answerSessionId', component: AnswerSessionComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
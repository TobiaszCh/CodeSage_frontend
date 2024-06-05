import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./components/course/course.component";
import { SubjectComponent } from "./components/subject/subject.component";
import { QuestionComponent } from "./components/question/question.component";
import { AnswerSessionComponent } from "./components/answer-session/answer-session.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";


const routes: Routes = [
    //CourseComopnent -> CoursesComponent
    //SubjectComponent -> CourseDetailsComponent url: chcemy id
    // /course/5
    // /answersession/315
    { path: 'courses', component: CourseComponent },
    { path: 'subjects', component: SubjectComponent},
    { path: 'answer-session', component: AnswerSessionComponent},
    { path: 'questions', component: QuestionComponent},
    { path: 'dialog', component: ConfirmDialogComponent},
    { path: '', redirectTo: 'courses', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
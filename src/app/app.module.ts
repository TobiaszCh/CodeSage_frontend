import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './components/subject/subject.component';
import { LevelComponent } from './components/level/level.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { UserSubjectComponent } from './components/user-subject/user-subject.component';
import { FormsModule } from '@angular/forms';
import { AnswerSessionComponent } from './components/answer-session/answer-session.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    SubjectComponent,
    LevelComponent,
    QuestionComponent,
    AnswerComponent,
    UserSubjectComponent,
    AnswerSessionComponent,
    ConfirmDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

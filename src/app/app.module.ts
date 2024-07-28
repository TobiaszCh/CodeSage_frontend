import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './components/subject/subject.component';
import { LevelComponent } from './components/level/level.component';
import { UserSubjectComponent } from './components/user-subject/user-subject.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AnswerSessionComponent } from './components/answer-session/answer-session.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    SubjectComponent,
    LevelComponent,
    UserSubjectComponent,
    AnswerSessionComponent,
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './subject/subject.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CredentialsInterceptor } from './credentials.interceptor';
import { AnswerSessionComponent } from './answer-session/answer-session.component';
import { RegistrationComponent } from './registration/registration.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { CourseDeleteDialogComponent } from './course/dialogs/delete/course-delete-dialog.component';
import { CourseEditDialogComponent } from './course/dialogs/edit/course-edit-dialog.component';
import { CourseAddDialogComponent } from './course/dialogs/add/course-add-dialog.component';
import { SubjectDeleteDialogComponent } from './subject/dialogs/delete/subject-delete-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { AnswerSessionDeleteDialogComponent } from './answer-session/dialogs/exit/answer-session-exit-dialog.component';
import { AnswerSessionOutcomeDialogComponent } from './answer-session/dialogs/outcome/answer-session-outcome-dialog.component';
import { SubjectInfoDialogComponent } from './subject/dialogs/info/subject-info-dialog.component';
import { SubjectStartSessionDialogComponent } from './subject/dialogs/start-session/subject-start-session-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SubjectEditDialogComponent } from './subject/dialogs/edit/subject-edit-dialog.component';
import { SubjectAddDialogComponent } from './subject/dialogs/add/subject-add-dialog.component';
import { ManageQuestionComponent } from './question-management/question-management.component';
import { ManageQuestionExitDialogComponent } from './question-management/dialogs/exit/question-management-exit-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    SubjectComponent,
    AnswerSessionComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    AuthComponent,
    ManageQuestionComponent,


    CourseDeleteDialogComponent,
    CourseAddDialogComponent,
    CourseEditDialogComponent,
    SubjectDeleteDialogComponent,
    AnswerSessionDeleteDialogComponent,
    AnswerSessionOutcomeDialogComponent,
    SubjectInfoDialogComponent,
    SubjectStartSessionDialogComponent,
    ManageQuestionExitDialogComponent,
    SubjectEditDialogComponent,
    SubjectAddDialogComponent
    
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

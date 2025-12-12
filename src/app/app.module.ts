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
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CourseDeleteDialogComponent } from './course/dialogs/delete/course-delete-dialog.component';
import { CourseEditDialogComponent } from './course/dialogs/edit/course-edit-dialog.component';
import { CourseAddDialogComponent } from './course/dialogs/add/course-add-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';


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

    CreateQuestionComponent,
    CourseDeleteDialogComponent,
    CourseAddDialogComponent,
    CourseEditDialogComponent,
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
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

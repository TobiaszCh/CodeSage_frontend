import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './subject/subject.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { CredentialsInterceptor } from './credentials.interceptor';
import { AnswerSessionComponent } from './answer-session/answer-session.component';
import { RegistrationComponent } from './registration/registration.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    SubjectComponent,
    AnswerSessionComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

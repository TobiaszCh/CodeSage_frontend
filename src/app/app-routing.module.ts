import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./components/course/course.component";
import { SubjectComponent } from "./components/subject/subject.component";


const routes: Routes = [
    { path: 'courses', component: CourseComponent },
    { path: 'courses/:courseId/subjects', component: SubjectComponent},
    { path: 'courses/:courseId/subjects/:subjectsId/questions', component: SubjectComponent} // Add your route here
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
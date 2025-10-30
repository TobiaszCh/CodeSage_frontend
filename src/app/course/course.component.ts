import { Component, OnInit } from '@angular/core';
import { CourseService, Courses } from './course.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
//zmiana na Courses 
export class CourseComponent implements OnInit {

  courses: Courses[] = [];
  phrase: string = "";
  editingId?: number;
  changeedDisplayName?:string


  constructor(private courseService: CourseService, private router: Router, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.getCourses();
  }

  public getCourses(): void {
    this.courseService.getCourses().subscribe(value =>
      this.courses = value)
  }

  public nextTemplete(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public deleteCourseById(courseId: number) {
    if(confirm("Czy na pewno chcesz usunąć ten kurs?")) {
      this.courseService.deleteCourseById(courseId).subscribe(() => {
        this.courses = this.courses.filter(course => course.id != courseId);
      });
    }
  }

  public updateCourse(courseId: number, displayName: string) {
    this.editingId = undefined;
    this.courseService.updateCourse(courseId, displayName).subscribe({
      error: () => {
        this.getCourses();
      }
    });
  }

  public escapeFromEdit(): void {
    this.editingId = undefined;
    this.getCourses();
  }

}




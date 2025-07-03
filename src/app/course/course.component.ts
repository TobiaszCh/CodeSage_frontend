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

  constructor(private courseService: CourseService, private router: Router, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.courseService.getCourses().subscribe(value =>
      this.courses = value)
  }

  public logout(): void {
    this.courseService.logout().subscribe({
      next: response => {
        this.showSuccess(response.message);
        this.router.navigate(["/login"]);
      
      },
      error: error => {
        console.log(error.error.message);
      }
    })

  }

  public nextTemplete(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  public sendPhrase(): void {
    this.courseService.sendPhrase(this.phrase);
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

}




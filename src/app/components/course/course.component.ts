import { Component, OnInit  } from '@angular/core';
import { CourseService, Courses} from './course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
//zmiana na Courses 
export class CourseComponent implements OnInit {

  courses: Courses[] = [];
  phrase!: string;

  constructor(private courseService: CourseService, private router: Router) {
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(value =>
       this.courses = value)
  }

  nextTemplete(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  sendPhrase() {
    this.courseService.sendPhrase(this.phrase);
  }
  
  }




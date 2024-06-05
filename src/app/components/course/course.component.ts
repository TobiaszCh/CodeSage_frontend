import { Component, OnInit  } from '@angular/core';
import { CourseService, Courses} from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Courses[] = [];
  phrase!: string;

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService.getCourse().subscribe(value =>
       this.courses = value)
  }

  sendPhrase() {
    this.courseService.sendPhrase(this.phrase);
  }

  sendCourseId(courseId: number) {
    this.courseService.postCourseId(courseId).subscribe();
    };
  }




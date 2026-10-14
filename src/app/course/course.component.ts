import { Component, OnInit } from '@angular/core';
import { CourseService, CourseSummaryDto } from './course.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseDeleteDialogComponent } from './dialogs/delete/course-delete-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
//zmiana na Courses 
export class CourseComponent implements OnInit {

  courseSummaryDto: CourseSummaryDto[] = [];

  constructor(private courseService: CourseService, private router: Router, private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getNameCourses();
  }

  public getNameCourses(): void {
    this.courseService.getCourses().subscribe(value =>
      this.courseSummaryDto = value)
  }

  public nextTemplete(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }


  public deleteCourseById(courseId: number) {
    this.courseService.deleteCourseById(courseId).subscribe(() => {
      this.courseSummaryDto = this.courseSummaryDto.filter(courseSummaryDto => courseSummaryDto.id != courseId);
    });
  }

  public goToCourseForm() {
    this.router.navigate(["courses/form"]);
  }

  public goToEditCourseForm(courseId: number): void {
    this.router.navigate(["courses", courseId, "form"]);
  }

  public openDeleteDialog(courseId: number): void {
    this.dialog.open(CourseDeleteDialogComponent, {
      width: '550px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteCourseById(courseId);
      }
    });
  }

}




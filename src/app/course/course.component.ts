import { Component, OnInit } from '@angular/core';
import { CourseService, Course} from './course.service';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseDeleteDialogComponent } from './dialogs/delete/course-delete-dialog.component';
import { CourseEditDialogComponent } from './dialogs/edit/course-edit-dialog.component';
import { CourseAddDialogComponent } from './dialogs/add/course-add-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
//zmiana na Courses 
export class CourseComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router, private dialog: MatDialog
  ) {}

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


  public deleteCourseById(courseId: number) {
    this.courseService.deleteCourseById(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course.id != courseId);
    });
  }

  public updateCourse(courseId: number, displayName: string) {
    this.courseService.updateCourse(courseId, displayName).subscribe(() => {
      this.getCourses();
    });
  }

  public createCourse(displayName: string): void {
    this.courseService.createCourse(displayName).subscribe(() => {
      this.getCourses();
    });
  }

  public openDeleteDialog(courseId: number): void {
    this.dialog.open(CourseDeleteDialogComponent, {
      width: '550px',
      height: "300"
    }).afterClosed().subscribe(result => {
      if(result) {
        this.deleteCourseById(courseId);
      }
    });
  }

  public openAddDialog(): void {
    this.dialog.open(CourseAddDialogComponent, {
      width: '550px',
      height: "300"
    }).afterClosed().subscribe(result => {
      if(result) {
        this.createCourse(result);
      }
    });
  }

  public openEditDialog(courseId: number, displayName: string): void {
    this.dialog.open(CourseEditDialogComponent, {
      width: '550px',
      height: "300",
      data: {
        name: displayName
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.updateCourse(courseId, result);
      }
    });
  }

}




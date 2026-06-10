import { Component, OnInit } from '@angular/core';
import { CourseService, DisplayNameCourse} from './course.service';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseDeleteDialogComponent } from './dialogs/delete/course-delete-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
//zmiana na Courses 
export class CourseComponent implements OnInit {

  displayNameCourse: DisplayNameCourse[] = [];
  accessToModifyCourse: boolean = true;
  

  constructor(private courseService: CourseService, private router: Router, private dialog: MatDialog
  ) {}

  public ngOnInit(): void { 
    this.getNameCourses();
  }

  public getNameCourses(): void {
    this.courseService.getNameCourses().subscribe(value =>
      this.displayNameCourse = value)
  }

  public nextTemplete(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }


  public deleteCourseById(courseId: number) {
    this.courseService.deleteCourseById(courseId).subscribe(() => {
      this.displayNameCourse = this.displayNameCourse.filter(displayNameCourse => displayNameCourse.id != courseId);
    });
  }

  public updateCourse(courseId: number, displayNameCourse: DisplayNameCourse) {
    this.courseService.updateCourse(courseId, displayNameCourse).subscribe(() => {
      this.getNameCourses();
    });
  }

  public createCourse(displayName: string): void {
    this.courseService.createCourse(displayName).subscribe(() => {
      this.getNameCourses();
    });
  }

  public goToCourseForm() {
    this.router.navigate(["courses/form"]);
  }

  public goToEditCourseForm(courseId: number): void {
    this.router.navigate(["courses", courseId, "form"]);
  }

  public privilegeToModifyCourse(courseId: number) {
    this.courseService.privilegeToModifyCourse(courseId).subscribe(result =>
      this.accessToModifyCourse  = result);
  }

  public openDeleteDialog(courseId: number): void {
    this.dialog.open(CourseDeleteDialogComponent, {
      width: '550px',
    }).afterClosed().subscribe(result => {
      if(result) {
        this.deleteCourseById(courseId);
      }
    });
  }

}




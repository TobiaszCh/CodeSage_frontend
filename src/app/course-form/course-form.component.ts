import { Component } from '@angular/core';
import { Course, CourseFormService,Visibility } from './course-form.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  image?: string;
  selectedFile!: File;
  course: Course = {
    displayName: "",
    description: "",
    visibility: Visibility.PRIVATE
  };

  constructor(private courseFormService: CourseFormService, private toastr: ToastrService, private router: Router) {

  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.image = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  public deleteImage() {
    this.image = "";
  }

  public createCourse(course: Course, file: File): void {
    this.courseFormService.createCourse(course, file).subscribe({
      next: (courseId) => {
        this.router.navigate(["courses", courseId]);
        this.showSuccess("Zapisano zmiany")
      },
      error: () => {
        this.showError("Uzupełnij pola właściwie")
      }
    })
  }

  public backToCourses(): void {
    this.router.navigate(["courses"]);
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public showError(messageToToastr: string) {
    this.toastr.error(messageToToastr, "Błąd!");
  }

}

import { Component, OnInit } from '@angular/core';
import { Course, CourseFormService, Role, UserInfo, Visibility } from './course-form.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  canSetPublic: boolean = true;
  image?: string;
  courseId?: number;
  selectedFile: File = new File([], '');
  course: Course = {
    displayName: "",
    description: "",
    imageUrl: "",
    visibility: Visibility.PRIVATE
  };

  constructor(private courseFormService: CourseFormService, private toastr: ToastrService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.courseId = param["courseId"];
      this.getCourseById(this.courseId);
    });
    this.getUserInfo();
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.image = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  public createOrUpdateCourse(course: Course, file: File): void {
    const request = this.courseId !== undefined
      ? this.courseFormService.updateCourse(this.courseId, course, file)
      : this.courseFormService.createCourse(course, file);
    request.subscribe({
      next: (courseId) => {
        this.router.navigate(["courses", courseId]);
        this.showSuccess("Zapisano zmiany");
      },
      error: (error) => {
        this.showError(error.error.message);
      }
    });
  }

  public getCourseById(courseId?: number) {
    if (courseId !== undefined) {
      this.courseFormService.getCourseById(courseId).subscribe(result => {
        this.course = result;
        this.image = result.imageUrl;
      });
    }
  }

  public getUserInfo(): void {
    this.courseFormService.getUserInfo().subscribe(result => {
      this.canSetPublic = result.role != Role.DEMO;
    });
  }

  public deleteImage() {
    this.image = undefined;
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

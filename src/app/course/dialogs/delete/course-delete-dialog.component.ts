import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './course-delete-dialog.component.html',
  styleUrls: ['./course-delete-dialog.component.css']
})
export class CourseDeleteDialogComponent  {
  constructor(public dialogRef: MatDialogRef<CourseDeleteDialogComponent>) {}
}
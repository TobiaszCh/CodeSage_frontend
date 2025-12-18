import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './course-add-dialog.component.html',
  styleUrls: ['./course-add-dialog.component.css']
})
export class CourseAddDialogComponent  {
displayName: string = "";
  constructor(public dialogRef: MatDialogRef<CourseAddDialogComponent>) {}
}
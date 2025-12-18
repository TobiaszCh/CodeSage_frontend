import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './subject-delete-dialog.component.html',
  styleUrls: ['./subject-delete-dialog.component.css']
})
export class SubjectDeleteDialogComponent  {
  constructor(public dialogRef: MatDialogRef<SubjectDeleteDialogComponent>) {}
}
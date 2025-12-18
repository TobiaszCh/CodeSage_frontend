import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './subject-info-dialog.component.html',
  styleUrls: ['./subject-info-dialog.component.css']
})
export class SubjectInfoDialogComponent  {
  constructor(public dialogRef: MatDialogRef<SubjectInfoDialogComponent>) {}
}
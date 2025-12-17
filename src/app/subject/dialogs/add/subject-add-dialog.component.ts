import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './subject-add-dialog.component.html',
  styleUrls: ['./subject-add-dialog.component.css']
})
export class SubjectAddDialogComponent  {
displayName: string = "";
  constructor(public dialogRef: MatDialogRef<SubjectAddDialogComponent>) {}
}
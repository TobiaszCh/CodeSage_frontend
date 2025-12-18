import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './subject-start-session-dialog.component.html',
  styleUrls: ['./subject-start-session-dialog.component.css']
})
export class SubjectStartSessionDialogComponent  {
  constructor(public dialogRef: MatDialogRef<SubjectStartSessionDialogComponent>) {}
}
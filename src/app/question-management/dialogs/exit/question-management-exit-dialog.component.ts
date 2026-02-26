import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './question-management-exit-dialog.component.html',
  styleUrls: ['./question-management-exit-dialog.component.css']
})
export class ManageQuestionExitDialogComponent  {
  constructor(public dialogRef: MatDialogRef<ManageQuestionExitDialogComponent>) {}
}
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './answer-session-exit-dialog.component.html',
  styleUrls: ['./answer-session-exit-dialog.component.css']
})
export class AnswerSessionDeleteDialogComponent  {
  constructor(public dialogRef: MatDialogRef<AnswerSessionDeleteDialogComponent>) {}
}
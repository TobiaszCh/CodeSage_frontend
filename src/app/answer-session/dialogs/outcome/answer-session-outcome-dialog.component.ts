import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AllPointsAnswerSession } from "../../answer-session.service";


@Component({
  templateUrl: './answer-session-outcome-dialog.component.html',
  styleUrls: ['./answer-session-outcome-dialog.component.css']
})
export class AnswerSessionOutcomeDialogComponent  {
  constructor(public dialogRef: MatDialogRef<AnswerSessionOutcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AllPointsAnswerSession) 
    {}

  public outcome(): boolean {
    return this.data?.correctAnswers/this.data?.allAnswers >= 0.8;
  }  
}
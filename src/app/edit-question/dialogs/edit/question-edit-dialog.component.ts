import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './question-edit-dialog.component.html',
  styleUrls: ['./question-edit-dialog.component.css']
})
export class QuestionEditDialogComponent  {
displayName: string = this.data.name;
  constructor(public dialogRef: MatDialogRef<QuestionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

}
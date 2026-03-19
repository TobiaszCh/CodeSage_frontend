import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  templateUrl: './subject-edit-dialog.component.html',
  styleUrls: ['./subject-edit-dialog.component.css']
})
export class SubjectEditDialogComponent  {
displayName: string = this.data.name;
  constructor(public dialogRef: MatDialogRef<SubjectEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
}
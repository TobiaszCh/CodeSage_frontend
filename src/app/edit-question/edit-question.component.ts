import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditQuestionService, Questions } from './edit-question.service';
import { SubjectEditDialogComponent } from '../subject/dialogs/edit/subject-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  questions!: Questions[];
  subjectId!: number;

  constructor(private activatedRoute: ActivatedRoute, private editQuestionService: EditQuestionService,
    private dialog: MatDialog, private router: Router, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.subjectId = param["subjectId"];
      this.editQuestionService.getQuestionsBySubjectId(this.subjectId).subscribe(result => 
        this.questions = result);
    })
  }

  public updateQuestions(questions: Questions[]): void {
    this.editQuestionService.updateQuestions(questions).subscribe({
      next: (courseId) => {
        this.router.navigate(["courses", courseId]);
        this.showSuccess("Edytowano pytania");
      },
      error: error => {
        this.showError(error.error.message);
      }
    });
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public showError(messageToToastr: string) {
    this.toastr.error(messageToToastr, "Błąd!");
  }
  
  public openEditQuestionDialog(questionIndex: number, displayName: string): void {
    this.dialog.open(SubjectEditDialogComponent, {
      width: '550px',
      data: {
        name: displayName
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.questions[questionIndex].displayName = result;
      }
    });
  }

    public openEditAnswerDialog(questionIndex: number, answerIndex: number, displayName: string): void {
    this.dialog.open(SubjectEditDialogComponent, {
      width: '550px',
      data: {
        name: displayName
      }
    }).afterClosed().subscribe(result => {
      if(result) {
        this.questions[questionIndex].answers[answerIndex].displayName = result;   
      }
    });
  }

}

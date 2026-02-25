import { Component, OnInit } from '@angular/core';
import { ManageQuestionService, Questions } from './question-management.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ManageQuestionExitDialogComponent } from './dialogs/exit/question-management-exit-dialog.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class ManageQuestionComponent implements OnInit {
  
  newQuestions!: Questions[];
  error!: string;
  correctAnswerIndex?: number;
  subjectId!: number;
  
  constructor(private manageQuestionService: ManageQuestionService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private dialog: MatDialog) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.subjectId = param["subjectId"];
      this.showOuestions(this.subjectId).subscribe(result => {
        this.newQuestions = this.addIndexCorrectAnswer(result); console.log(this.newQuestions[1]);console.log(this.newQuestions[1].answers); });
            
    })
  }
  
  public createOrUpdateQuestions(newQuestions: Questions[]): void {
    this.manageQuestionService.hasQuestionsInSubject(this.subjectId).pipe(switchMap(result => 
      result  
      ? this.manageQuestionService.updateQuestions(newQuestions)
      : this.manageQuestionService.createQuestions(newQuestions)
    )).subscribe({
        next: (courseId) => {
          this.router.navigate(["courses", courseId]);
          this.showSuccess("Zapisano zmiany");
        },
        error: error => {
          this.showError(error.error.message);
        }
    })
  }

  public backToSubjects(subjectId: number): void {
    this.manageQuestionService.getCoursId(subjectId).subscribe(result => {
      this.router.navigate(["courses", result]);
    })
  }

  public showOuestions(subjectId: number): Observable<Questions[]> {
    return this.manageQuestionService.hasQuestionsInSubject(subjectId).pipe(switchMap(result => 
      result ? this.manageQuestionService.getQuestionsBySubjectId(subjectId)
       : of(Array.from({length: 10}, () => ({
          displayName: "", 
          subjectId: subjectId,
          answers: [
            {displayName: "", isCorrect: false},
            {displayName: "", isCorrect: false},
            {displayName: "", isCorrect: false},
            {displayName: "", isCorrect: false}
          ]
      })))
    ));
  }

  public correctAnswer(questionIndex: number, correctAnswerIndex?: number): void {
    const questions = this.newQuestions[questionIndex];
    questions.answers.forEach((result, index) => result.isCorrect = index === correctAnswerIndex);
    this.correctAnswerIndex = undefined;    
  }

  public addIndexCorrectAnswer(questions: Questions[]): Questions[] {
    return questions.map(result => {
      result.indexCorrectAnswer = result.answers.findIndex(result => result.isCorrect == true);
      return result;
    }); 
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public showError(messageToToastr: string) {
    this.toastr.error(messageToToastr, "Błąd!");
  }

  public openExitDialog(subjectId: number): void {
    this.dialog.open(ManageQuestionExitDialogComponent, {
      width: '550px'
    }).afterClosed().subscribe(result => {
      if(result) {
        this.backToSubjects(subjectId);
      }
    });
  }
 
}

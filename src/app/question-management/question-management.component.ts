import { Component, OnInit } from '@angular/core';
import { ManageQuestionService, Question, Subject, SubjectDetails } from './question-management.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ManageQuestionExitDialogComponent } from './dialogs/exit/question-management-exit-dialog.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class ManageQuestionComponent implements OnInit {
  
  questions!: Question[];
  correctAnswerIndex?: number;
  subjectId!: number;
  subject: Subject = {
    id: 0,
    displayName: ""
  };
  
  constructor(private manageQuestionService: ManageQuestionService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private dialog: MatDialog) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.subjectId = param["subjectId"];
      this.showOuestions(this.subjectId);
      this.getSubjectById(this.subjectId);         
    })
  }
  
  public createOrUpdateQuestions(newQuestions: Question[]): void {
    this.manageQuestionService.hasQuestionsInSubject(this.subjectId).pipe(switchMap(result => 
      result  
      ? this.manageQuestionService.updateSubjectDetails(this.subjectId, this.subjectDeatils())
      : this.manageQuestionService.createQuestions(newQuestions)
    )).subscribe({
        next: courseId => {
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

  public showOuestions(subjectId: number): void {
    this.manageQuestionService.hasQuestionsInSubject(subjectId).pipe(switchMap(result => 
      result 
      ? this.manageQuestionService.getQuestionsBySubjectId(subjectId)
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
    )).subscribe(result => {
        this.questions = this.addIndexCorrectAnswer(result)
      });
  }

  public correctAnswer(questionIndex: number, correctAnswerIndex?: number): void {
    const questions = this.questions[questionIndex];
    questions.answers.forEach((result, index) => result.isCorrect = index === correctAnswerIndex);
    this.correctAnswerIndex = undefined;    
  }

  public addIndexCorrectAnswer(questions: Question[]): Question[] {
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

  public subjectDeatils(): SubjectDetails {
    const subjectDeatils: SubjectDetails = {
      questions: this.questions,
      displayName: this.subject.displayName
    }
    return subjectDeatils;
  }

  public getSubjectById(subjectId: number): void {
    this.manageQuestionService.getSubjectById(this.subjectId).subscribe({
      next: result => {
        this.subject = result;
      },
      error: error => {
        this.showError(error.error.message);
      }
    });
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

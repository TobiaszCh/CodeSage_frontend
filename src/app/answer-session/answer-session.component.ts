import { Component, HostListener, OnInit } from '@angular/core';
import { Question, AnswerSessionService, AllPointsAnswerSession } from './answer-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AnswerSessionDeleteDialogComponent } from './dialogs/exit/answer-session-exit-dialog.component';
import { AnswerSessionOutcomeDialogComponent } from './dialogs/outcome/answer-session-outcome-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer-session',
  templateUrl: './answer-session.component.html',
  styleUrls: ['./answer-session.component.css']
})

export class AnswerSessionComponent implements OnInit {

  question?: Question;
  allPointsAnswerSession!: AllPointsAnswerSession;
  checkAnswer?: number;
  answerSessionId!: number;
  correctAnswerId!: number;
  informAboutResponse: string = "";
  blockAnswer = false;
  showMeInform = false;
  blockNext = false;
  blockCheck = true;
  blockEnd = false;
  showResult = false;
  sendedAsnwerId!: number;

  constructor(private answerSessionService: AnswerSessionService, private activatedRoute: ActivatedRoute, private router: Router,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.answerSessionId = params['answerSessionId'];
      this.nextQuestion(this.answerSessionId);
    })
  }

  public nextQuestion(answerSessionId: number) {
    this.informAboutResponse = "";
    this.answerSessionService.getQuestions(answerSessionId).subscribe(question => {
      if (question !== null) {
        this.question = question;
        this.showMeInform = false;
        this.blockNext = false;
        this.blockCheck = true;
        this.blockAnswer = false;
        this.checkAnswer = undefined;
        this.getPoints(answerSessionId);
      }
      else {
        this.answerSessionService.getPoints(answerSessionId).subscribe(allPointsAnswerSession => {
          this.allPointsAnswerSession = allPointsAnswerSession;
          this.blockNext = false;
          this.blockCheck = false;
          this.showMeInform = false;
          this.openOutcometDialog();
        });
      }
    });
  }

  public selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number) {
    this.answerSessionService.selectQuestionAnswer(answerSessionId, questionId, answerId).subscribe(correctAnswerId => {
      this.correctAnswerId = correctAnswerId;
      this.sendedAsnwerId = answerId;
      this.showMeInform = true;
      this.blockNext = true;
      this.blockCheck = false;
      this.blockAnswer = true;
      this.showResult = true
    });
  }

  public informForUser(): string {
    if (this.checkAnswer === this.correctAnswerId) {
      this.informAboutResponse = "Ta odpowiedź jest prawidłowa :)";
    }
    else {
      this.informAboutResponse = "Przykro mi, ta odpowiedź jest błędna :("
    }
    return this.informAboutResponse;
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: BeforeUnloadEvent): void {
    this.updateAnswerSessionStatus(this.answerSessionId).subscribe();
  }

  @HostListener('window:popstate')
  public stoppedBackAndForth(): void {
    confirm("Sesja trwa. Ta operacja może spowodować jej niezapisanie :(")
    this.updateAnswerSessionStatus(this.answerSessionId).subscribe();
  }

  public updateAnswerSessionStatus(answerSessionId: number): Observable<any> {
    return this.answerSessionService.updateAnswerSessionStatus(answerSessionId);
  }

  public getPoints(answerSessionId: number) {
    return this.answerSessionService.getPoints(answerSessionId).subscribe(allPointsAnswerSession =>
       this.allPointsAnswerSession = allPointsAnswerSession);
  }

  public progress(): number {
    if(this.allPointsAnswerSession == undefined) return 0;
    return this.allPointsAnswerSession.allAnswers/10 * 100;
  }

  public backToSubjects(answerSessionId: number): void {
    this.answerSessionService.getCoursId(answerSessionId).subscribe(result => {
      this.router.navigate(["/courses", result]);
    });
  }

  public openExitDialog(): void {
    this.dialog.open(AnswerSessionDeleteDialogComponent, {
      width: '550px'
    }).afterClosed().subscribe(result => {
      if(result) {
        this.updateAnswerSessionStatus(this.answerSessionId).subscribe(() => 
        this.backToSubjects(this.answerSessionId));
      }
    });
  }

  public openOutcometDialog(): void {
    this.dialog.open(AnswerSessionOutcomeDialogComponent, {
      width: '550px',
      disableClose: true,
      data: this.allPointsAnswerSession
    }).afterClosed().subscribe(result => {
      if(result) {
        this.updateAnswerSessionStatus(this.answerSessionId).subscribe(() =>
        this.backToSubjects(this.answerSessionId));
      }
    });
  }
  
}



import { Component, HostListener, OnInit } from '@angular/core';
import { Question, AnswerSessionService } from './answer-session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-answer-session',
  templateUrl: './answer-session.component.html',
  styleUrls: ['./answer-session.component.css']
})

export class AnswerSessionComponent implements OnInit {

  question?: Question;
  checkAnswer!: number;
  answerSessionId!: number;
  correctAnswerId?: number;
  informAboutResponse: string = "";
  blockAnswer = false;
  showMeInform = false;
  blockNext = false;
  blockCheck = true;
  blockEnd = false;

  constructor(private answerSessionService: AnswerSessionService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.answerSessionId = params['answerSessionId']
      this.nextQuestion(this.answerSessionId);
    })
  }

  public nextQuestion(answerSessionId: number) {
    this.informAboutResponse = "";
    this.answerSessionService.getQuestions(answerSessionId).subscribe(question => {
      if (question !== null) {
        this.question = question
        this.showMeInform = false
        this.blockNext = false
        this.blockCheck = true
        this.blockAnswer = false

      }

      else {
        this.blockNext = false;
        this.blockCheck = false;
        this.blockEnd = true;
        this.showMeInform = false

      }
    });
  }

  public selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number) {
    this.answerSessionService.selectQuestionAnswer(answerSessionId, questionId, answerId).subscribe(correctAnswerId => {
      this.correctAnswerId = correctAnswerId
      this.showMeInform = true
      this.blockNext = true
      this.blockCheck = false
      this.blockAnswer = true
    })
  }

  public nextTemplete(): void {
    console.log("Updating answer session status for ID:", this.answerSessionId);
    this.updateAnswerSessionStatus(this.answerSessionId);
    this.router.navigate(['/courses']);
  }

  public informForUser(): String {
    if (this.checkAnswer === this.correctAnswerId) {
      this.informAboutResponse = "Ta odpowiedź jest prawidłowa :)";
    }
    else {
      this.informAboutResponse = "Przykro mi, ta odpowiedź jest nieprawidłowa. Poprawna odpowiedź to: " + this.question?.answers
        .filter(idAnswer => idAnswer.id == this.correctAnswerId).map(response => response.displayName).join();
    }
    return this.informAboutResponse;
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: BeforeUnloadEvent): void {
    event.preventDefault();
    this.updateAnswerSessionStatus(this.answerSessionId);
  }

  @HostListener('window:popstate')
  public stoppedBackAndForth(): void {
    confirm("Wpowadzone zmiany nie zostać zapisane :(")
    this.updateAnswerSessionStatus(this.answerSessionId);
  }

  public updateAnswerSessionStatus(answerSessionId: number): void {
    this.answerSessionService.updateAnswerSessionStatus(answerSessionId);

  }

}



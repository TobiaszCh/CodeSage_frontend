import { Component, HostListener, OnInit } from '@angular/core';
import { Answer, Question, AnswerSessionService } from './answer-session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-answer-session',
  templateUrl: './answer-session.component.html',
  styleUrls: ['./answer-session.component.css']
})
//zmien na AnswerSession
export class AnswerSessionComponent implements OnInit {

  question?: Question;
  checkAnswer?: Answer;
  answerSessionId!: number;
  correctAnswerId?: number;
  blockAnswer = false;
  showMeInform = false;
  blockNext = false;
  blockCheck = true;
  blockEnd = false;

  constructor(private answerSessionService: AnswerSessionService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.answerSessionId = params['answerSessionId']
      this.nextQuestion(this.answerSessionId);
    })

  }
  nextQuestion(answerSessionId: number) {
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

  selectQuestionAnswer(answerSessionId: number, questionId: number, answerId: number): void {
    this.answerSessionService.selectQuestionAnswer(answerSessionId, questionId, answerId).subscribe(correctAnswerId =>
      this.correctAnswerId = correctAnswerId);
    this.showMeInform = true
    this.blockNext = true
    this.blockCheck = false
    this.blockAnswer = true
  }

  nextTemplete(): void {
    console.log("Updating answer session status for ID:", this.answerSessionId);
    this.updateAnswerSessionStatus(this.answerSessionId);
    this.router.navigate(['/courses']);
  }



  informForUser(): String {
    if (this.checkAnswer?.id === this.correctAnswerId) {
      return "This response was correct :)"
    }
    else if (this.checkAnswer?.id !== this.correctAnswerId) {
      return "This response wasn't correct. Correct answer is: " + this.question?.answers
        .filter(idAnswer => idAnswer.id == this.correctAnswerId).map(response => response.displayName).join();
    }
    else {
      return ""
    }
  }


  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    event.preventDefault();
  }

  @HostListener('window:unload') 
  unloadHandler(): void {
    this.updateAnswerSessionStatus(this.answerSessionId);
    
  }


  @HostListener('window:popstate')
  stoppedBackAndForth(): void {
    confirm("Wpowadzone zmiany mogą nie zostać zapisane :(")
    this.updateAnswerSessionStatus(this.answerSessionId);
  }

  updateAnswerSessionStatus(answerSessionId: number): void {
    this.answerSessionService.updateAnswerSessionStatus(answerSessionId).subscribe();

  }

}



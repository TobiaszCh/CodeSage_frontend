import { Component, OnInit } from '@angular/core';
import { CreateQuestionService, Questions } from './create-question.service';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  
  questions!: Questions[];
  basicQuestion: Questions = {
    displayName: "",
    subjectId: 0,
    answers: [
      {displayName: "", isCorrect: false},
      {displayName: "", isCorrect: false},
      {displayName: "", isCorrect: false},
      {displayName: "", isCorrect: false}
    ]
  }
  blockInstruction = true;
  showAll: boolean = false;
  error!: string;
  options: any;
  goodAnswer!: string;
  tenQuestions: boolean = false
  
  constructor(private createQuestionService: CreateQuestionService, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      const subjectId = param["subjectId"];
      this.createQuestionService.getQuestionsBySubjectId(subjectId).subscribe(response =>
        this.questions = response);
    })
  }

  public createQuestion(): void {
    this.activatedRoute.params.subscribe(param => {
      this.basicQuestion.subjectId = param["subjectId"];
      this.addCorrectAnswer(this.goodAnswer);
      this.createQuestionService.createQuestion(this.basicQuestion).subscribe({
        next: () => {
          this.questions.push(this.basicQuestion);
          this.basicQuestion = {
            displayName: "",
            subjectId: 0,
            answers: [
              {displayName: "", isCorrect: false},
              {displayName: "", isCorrect: false},
              {displayName: "", isCorrect: false},
              {displayName: "", isCorrect: false}
            ]
          }
        },
        error: error => {
          this.error = error.error.message;
        }
      });
    })
  }

  public changeShowAll(): void {
    if(this.showAll) {
       this.showAll = false
    }
    else if(!this.showAll) {
       this.showAll = true
    }
  }

  public addCorrectAnswer(displayName: string) {
    this.basicQuestion.answers.filter(result => result.displayName == displayName)
    .map(result => result.isCorrect = true);
  }

  public subjectHasTenQuestions(): void {
    if(this.questions.length == 9) {
      this.tenQuestions = true;
    }
  }

  public backToCourses(): void {
    this.router.navigate(["/courses"]);
  }
}

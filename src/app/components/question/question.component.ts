import { Component, OnInit } from '@angular/core';
import { Answer, QuestionService, Questions } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  questions!: Questions[];
  numberQuestion = 0;
  checkAnswer: Answer | undefined

  constructor(private questionService :QuestionService) {
    
  }
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(value => this.questions = value);
  }

  nextQuestion(): void {
    if(this.numberQuestion < this.questions.length - 1) {
      this.numberQuestion++;
      this.checkAnswer = undefined;
    }
  }

  beforeQuestion(): void {
    if(this.numberQuestion > 0) {
      this.numberQuestion--;
      this.checkAnswer = undefined;

    }
  }
}

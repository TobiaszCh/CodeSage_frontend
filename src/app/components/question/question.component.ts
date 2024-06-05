import { Component, OnInit } from '@angular/core';
import { Answer, Question, QuestionService} from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
//zmien na AnswerSession
export class QuestionComponent implements OnInit{

  question?: Question;
  numberQuestion = 0;
  checkAnswer?: Answer;
  courseId: any;
  points = 0;

  constructor(private questionService : QuestionService) {
  }

  ngOnInit(): void {
    //pobierz answerSession z Url
    this.nextQuestion();

  }
nextQuestion() {
  //dodac paramentr answerSessionId
  this.questionService.getQuestions("nextQuesion").subscribe(question => this.question = question);


  }
  finish(): void {

  }

  beforeQuestion(): void {

  }
}

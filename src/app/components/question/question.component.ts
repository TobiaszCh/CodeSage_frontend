import { Component, OnInit } from '@angular/core';
import { QuestionService, Questions } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{

  questions: Questions[] = [];

  constructor(private questionService :QuestionService) {
    
  }
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(value => value = this.questions );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClienct: HttpClient) { 

  }

  public getQuestions(nextQuestion: String): Observable<Question> {
    return this.httpClienct.get<Question>("http://localhost:8020/questions/subjectId/" + nextQuestion);
  }

}

export interface Question {
  id: number;
  displayName: string;
  answers: Answer[];
}

export interface Answer {
  displayName: string;
  correct: boolean;
}


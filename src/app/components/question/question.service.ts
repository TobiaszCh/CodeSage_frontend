import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClienct: HttpClient) { 

  }

  public getQuestions(): Observable<Questions[]> {
    return this.httpClienct.get<Questions[]>("http://localhost:8020/questions");
  }

}

export interface Questions {
  id: number;
  displayName: string;
  answers: Answer[];
}

export interface Answer {
  displayName: string;
  correct: boolean;
}
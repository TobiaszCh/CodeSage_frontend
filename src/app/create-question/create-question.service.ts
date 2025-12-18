import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public createQuestion(basicQuestion: Questions) {
    const createQuestion: Questions = {
      displayName: basicQuestion.displayName,
      subjectId: basicQuestion.subjectId,
      answers: basicQuestion.answers
    } 
    return this.httpClient.post(`${this.baseUrl}/questions`, createQuestion);

  }

    public getQuestionsBySubjectId(subjectId: number): Observable<Questions[]>   {
      return this.httpClient.get<Questions[]>(`${this.baseUrl}/questions/${subjectId}`);
  }
}

export interface Questions {
  displayName: string;
  subjectId: number;
  answers: Answer[];
}

export interface Answer {
  displayName: string;
  isCorrect: boolean;
}
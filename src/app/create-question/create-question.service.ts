import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }

  public createQuestions(questions: Questions[]): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}/questions`, questions);
  }

  public getCoursId(subjectId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/subjects/${subjectId}/course-id`);
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
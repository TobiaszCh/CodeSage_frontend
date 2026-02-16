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

  public updateQuestions(questions: Questions[]): Observable<number> {
    return this.httpClient.patch<number>(`${this.baseUrl}/questions`, questions);
  }

  public getCoursId(subjectId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/subjects/${subjectId}/course-id`);
  }

  public getQuestionsBySubjectId(subjectId: number): Observable<Questions[]> {
    return this.httpClient.get<Questions[]>(`${this.baseUrl}/questions/${subjectId}`);
  }

  public hasQuestionsInSubject(subjectId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/questions/subjectId/${subjectId}`);
  }
}

export interface Questions {
  id?: number;
  displayName: string;
  subjectId: number;
  answers: Answer[];
  indexCorrectAnswer?: number;
}

export interface Answer {
  id?: number;
  displayName: string;
  isCorrect: boolean;
}
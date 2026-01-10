import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditQuestionService {

private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }

  public getQuestionsBySubjectId(subjectId: number): Observable<Questions[]> {
    return this.httpClient.get<Questions[]>(`${this.baseUrl}/questions/${subjectId}`);
  }

  public updateQuestions(questions: Questions[]): Observable<number> {
    return this.httpClient.patch<number>(`${this.baseUrl}/questions`, questions);
  }
}

export interface Questions {
  id: number;
  displayName: string;
  subjectId: number;
  answers: Answer[];
}

export interface Answer {
  id: number;
  displayName: string;
}
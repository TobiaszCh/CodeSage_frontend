import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageQuestionService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
    
  }

  public createQuestions(questions: Question[]): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}/questions`, questions);
  }

  public updateSubjectDetails(subjectId: number, subjectDetails: SubjectDetails): Observable<number> {
    return this.httpClient.patch<number>(`${this.baseUrl}/subjects/${subjectId}`, subjectDetails);
  }

  public getCoursId(subjectId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/subjects/${subjectId}/course-id`);
  }

  public getQuestionsBySubjectId(subjectId: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.baseUrl}/questions/${subjectId}`);
  }

  public hasQuestionsInSubject(subjectId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/questions/subjectId/${subjectId}`);
  }

  public getSubjectById(subjectId: number): Observable<Subject> {
    return this.httpClient.get<Subject>(`${this.baseUrl}/subjects/${subjectId}`);
  }
}

export interface Question {
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

export interface Subject {
  id: number;
  displayName: string;
}

export interface SubjectDetails {
  displayName: String;
  questions: Question[];
}
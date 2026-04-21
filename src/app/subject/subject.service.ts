import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

  }

  public getSubjects(courseId: number): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${this.baseUrl}/subjects/by-course/${courseId}`);
  }

  public sendSubjectIdToAnswerSession(subjectId: number): Observable<number> {
    const subjectIdToAnswerSession: SubjectIdToAnswerSession = {
      id: subjectId
    }
    return this.httpClient.post<number>(`${this.baseUrl}/answer-session/subjectId`, subjectIdToAnswerSession);
  }

  public getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId: number): Observable<SubjectCompletionStatus[]> {
    return this.httpClient.get<SubjectCompletionStatus[]>(`${this.baseUrl}/subjects/correct-answers-at-least-80/${courseId}`);
  }

  public getCourseById(courseId: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/courses/${courseId}`);
  }

  public createSucject(displayName:string, courseId:number,): Observable<number> {
    const createSubject: CreateSubject = {
      courseId: courseId,
      displayName:displayName
    }
    return this.httpClient.post<number>(`${this.baseUrl}/subjects`, createSubject)
  }

  public deleteSubjectById(subjectId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/subjects/${subjectId}`);
  }

  public hasQuestionsInSubject(subjectId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/questions/subjectId/${subjectId}`);
  }
}

export interface Subject {
  id: number;
  displayName: string;
  courseId: number
}

export interface SubjectCompletionStatus {
  id: number,
  answerSessionId: number,
  subjectCompletedAge: SubjectCompletedAge
}

export interface SubjectIdToAnswerSession {
  id: number
}

export interface AnswerSession {
  id: number
}

export enum SubjectCompletedAge {
  FRESH = "FRESH",
  OLD = "OLD"
}

export interface Course {
  id: number;
  displayName: string;
}

export interface CreateSubject {
  displayName: string,
  courseId?: number
}
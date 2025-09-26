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

  public getSubject(courseId: number): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>(`${this.baseUrl}/subjects/${courseId}`);
  }

  public sendSubjectIdToAnswerSession(subjectId: number): Observable<number> {
    const subjectIdToAnswerSessionDto: SubjectIdToAnswerSessionDto = {
      id: subjectId
    }
    console.log(subjectIdToAnswerSessionDto.id)
    return this.httpClient.post<number>(`${this.baseUrl}/answer-session/subjectId`, subjectIdToAnswerSessionDto);
  }

  public getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId: number): Observable<CheckCompletedSessions[]> {
    return this.httpClient.get<CheckCompletedSessions[]>(`${this.baseUrl}/subjects/correctAnswersAtLeast80Percent/${courseId}`);
  }

  public getCourseById(courseId: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseUrl}/courses/search/${courseId}`);
  }
}

export interface Subject {
  id: number;
  displayName: string;
  courseId: number
}

export interface CheckCompletedSessions {
  id: number,
  answerSessionId: number,
  subjectCompletedAge: SubjectCompletedAge
}

export interface SubjectIdToAnswerSessionDto {
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
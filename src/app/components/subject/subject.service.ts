import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) {

  }

  public getSubject(courseId: number): Observable<Subject[]> {
    return this.httpClient.get<Subject[]>("http://localhost:8020/subjects/" + courseId);
  }

  public sendSubjectIdToAnswerSession(subjectId: number): Observable<number> {
    const subjectIdToAnswerSessionDto: SubjectIdToAnswerSessionDto = {
      id: subjectId
    }
    console.log(subjectIdToAnswerSessionDto.id)
    return this.httpClient.post<number>("http://localhost:8020/answer-session/subjectId", subjectIdToAnswerSessionDto);
  }

  public getAllNumbersOfCorrectAnswersAtLeast80Percent(courseId: number): Observable<CheckCompletedSessions[]> {
    return this.httpClient.get<CheckCompletedSessions[]>("http://localhost:8020/subjects/correctAnswersAtLeast80Percent/" + courseId);
  }

  public getCourseById(courseId: number): Observable<Course> {
    return this.httpClient.get<Course>("http://localhost:8020/courses/search/" + courseId);
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
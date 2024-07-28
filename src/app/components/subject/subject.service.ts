import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient ) {

  }

 public getSubject(courseId: number): Observable<Subject[]> {
   return this.httpClient.get<Subject[]>("http://localhost:8020/subjects/" + courseId)
 }

 public sendSubjectIdToAnswerSession(subjectId: number): Observable<any> {
  return this.httpClient.post<any>("http://localhost:8020/answer-session/subjectId", {subjectId});
}
}

export interface Subject {
 id: number;
 displayName: string;
 courseId: number
}
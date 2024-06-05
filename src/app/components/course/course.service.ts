import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  phrase?: string = "";

  constructor(private httpClient: HttpClient ) {

   }

  public getCourse(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>("http://localhost:8020/courses")
  }

  public postCourseId(courseId: number): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8020/subjects/courseId", {courseId});
  }
  

  sendPhrase(phrase: string) {
    this.phrase = phrase;
  }

}

export interface Courses {
  id: number;
  displayName: string;
}



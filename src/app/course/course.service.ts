import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  phrase: string = "";
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient ) {

   }

  public getCourses(): Observable<Courses[]> {
    console.log(this.baseUrl);
    return this.httpClient.get<Courses[]>(`${this.baseUrl}/courses`);
  }

  public logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/logout`, {});
  }

  public deleteCourseById(courseId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/courses/delete/${courseId}`);
  }

  public updateCourse(courseId: number, displayName: string): Observable<any> {
    const courses: Courses = {
      id: courseId,
      displayName:displayName
    }
    return this.httpClient.patch(`${this.baseUrl}/courses/update/${courseId}`, courses)
  }

}

export interface Courses {
  id: number;
  displayName: string;
}



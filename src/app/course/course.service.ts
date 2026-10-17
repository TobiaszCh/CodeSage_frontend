import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getCourses(): Observable<CourseSummaryDto[]> {
    console.log(this.baseUrl);
    return this.httpClient.get<CourseSummaryDto[]>(`${this.baseUrl}/courses`);
  }

  public deleteCourseById(courseId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/courses/${courseId}`);
  }
}

export interface CourseSummaryDto {
  id: number;
  displayName: string;
  imageUrl?: string;
  visibility: Visibility;
  countOfSubjectsInCourse: number;
  accessToModifyCourse: boolean;
}

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}



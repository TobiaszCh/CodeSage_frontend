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

  public getNameCourses(): Observable<CourseSummaryDto[]> {
    console.log(this.baseUrl);
    return this.httpClient.get<CourseSummaryDto[]>(`${this.baseUrl}/courses`);
  }

  public deleteCourseById(courseId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/courses/${courseId}`);
  }

  public updateCourse(courseId: number, course: CourseSummaryDto): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/courses/${courseId}`, course);
  }

  public createCourse(displayName: string): Observable<any> {
    const createCourse: CreateCourse = {
      displayName: displayName
    }
    return this.httpClient.post(`${this.baseUrl}/courses`, createCourse);
  }

}

export interface CourseSummaryDto {
  id: number;
  displayName: string;
  accessToModifyCourse: boolean;
}

export interface CreateCourse {
  displayName: string;
}



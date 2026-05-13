import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseFormService {

  private baseUrl = environment.apiUrl;
  
    constructor(private httpClient: HttpClient ) {
    }

  public createCourse(course: Course, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseDto", new Blob([JSON.stringify(course)], {type: "application/json"}));
    return this.httpClient.post(`${this.baseUrl}/courses`, formData);
  }
  
}

export interface Course {
  id?: number;
  displayName: string;
  description: string;
  visibility: Visibility;
}

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

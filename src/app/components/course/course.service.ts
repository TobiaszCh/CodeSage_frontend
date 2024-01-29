import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient ) {

   }

  public getCourse(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>("http://localhost:8020/courses")
  }
}

export interface Courses {
  id: number;
  displayName: string;
}


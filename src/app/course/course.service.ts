import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  phrase?: string = "";
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient ) {

   }

  public getCourses(): Observable<Courses[]> {
    console.log(this.baseUrl);
    return this.httpClient.get<Courses[]>(`${this.baseUrl}/courses`);
  }
  
  sendPhrase(phrase: string) {
    this.phrase = phrase;
  }

}

export interface Courses {
  id: number;
  displayName: string;
}



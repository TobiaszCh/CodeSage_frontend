import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient ) {

  }

 public getSubject(): Observable<Subject[]> {
   return this.httpClient.get<Subject[]>("http://localhost:8020/subjects")
 }
}

export interface Subject {
 id: number;
 displayName: string;
 courseId: number
}

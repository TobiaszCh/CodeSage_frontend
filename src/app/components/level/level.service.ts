import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private httpClienct: HttpClient) { 

  }

  public getLevels(): Observable<Levels[]> {
    return this.httpClienct.get<Levels[]>("http://localhost:8020/levels");
  }
}

export interface Levels {
  id: number
  subjectId: number
}
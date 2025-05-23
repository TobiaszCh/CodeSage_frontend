import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

  public sendDatesLogs(username: string, password: string): Observable<any> {
    const userDto: UserDto = {
      username: username,
      password: password
    }
    return this.http.post(`${this.baseUrl}/api/login`, userDto);
  
  }
  
}

export interface UserDto {
  username: String;
  password: String
}



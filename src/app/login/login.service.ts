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

  public sendDatesLogs(username: String, password: String): Observable<any> {
    const userDto: UserDto = {
      username: username,
      password: password
    }
    console.info(userDto.password, userDto.username);
    return this.http.post(`${this.baseUrl}/api/login`, userDto);
  
  }
  
}

export interface UserDto {
  username: String;
  password: String
}



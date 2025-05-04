import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    urlToLog: String = ""

    constructor(private http: HttpClient) { }

  public sendDatesLogs(username: String, password: String): Observable<any> {
    const userDto: UserDto = {
      username: username,
      password: password
    }
    console.info(userDto.password, userDto.username);
    return this.http.post("http://localhost:8020/api/login", userDto);
  
  }
  
}

export interface UserDto {
  username: String;
  password: String
}



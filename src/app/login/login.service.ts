import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

  public sendDatesLogs(username: string, password: string): Observable<any> {
    const userDto: LoginDto = {
      username: username,
      password: password
    }
    return this.http.post(`${this.baseUrl}/login`, userDto);
  }

  public loginByGoogle() {
    window.location.href = `${this.baseUrl}/oauth2/authorization/google`;
  }
}

export interface LoginDto {
  username: string;
  password: string;
}



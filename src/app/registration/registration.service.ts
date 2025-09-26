import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public sendRegisterDetails(username: string, password: string, repeatedPassword: string): Observable<any> {
    const userRegisterDto: UserRegisterDto = {
      username: username,
      password: password,
      repeatedPassword: repeatedPassword
    }
    return this.http.post(`${this.baseUrl}/register`, userRegisterDto);
  }
}

export interface UserRegisterDto {
  username: string;
  password: string;
  repeatedPassword: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getUserName(): Observable<UsernameDto> {
    return this.httpClient.get<UsernameDto>(`${this.baseUrl}/username`);
  }

  public logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/logout`, {});
  }
}

export interface UsernameDto {
  username: string;
}

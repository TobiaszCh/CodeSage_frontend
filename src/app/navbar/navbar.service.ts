import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(this.baseUrl)
  }

  public logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/logout`, {});
  }
}

export class UserProfile {
  username!: string;
  role?: string;
  createdAt?: string;
}

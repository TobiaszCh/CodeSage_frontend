import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClinent: HttpClient) {

  }

  public getUserName(): Observable<UsernameDto> {
    return this.httpClinent.get<UsernameDto>(`${this.baseUrl}/username`);
  }
  
}

export interface UsernameDto {
  username: string;
}

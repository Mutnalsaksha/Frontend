import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust the URL to your backend API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`; // Endpoint for user login in your backend

    return this.http.post<any>(loginUrl, { email, password }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}


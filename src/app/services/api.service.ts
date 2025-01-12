import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL da API

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  getTasks(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  completeTask(taskId: number, token: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/tasks/${taskId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

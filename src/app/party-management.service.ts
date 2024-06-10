import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyManagementService {
  private baseUrl = 'https://ap.greatfuturetechno.com';

  constructor(private http: HttpClient) {}

  private getToken(): any {
    return localStorage.getItem('authToken');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.getToken()}`,
    });
  }

  login(body: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, body);
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logout/`,
      {},
      { headers: this.getHeaders() }
    );
  }

  getPartyById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/party/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }

  getAllParties(): Observable<any> {
    return this.http.get(`${this.baseUrl}/party/`, {
      headers: this.getHeaders(),
    });
  }

  createParty(body: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/party/`, body, {
      headers: this.getHeaders(),
    });
  }

  updateParty(id: number, body: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/party/?id=${id}`, body, {
      headers: this.getHeaders(),
    });
  }

  deleteParty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/party/?id=${id}`, {
      headers: this.getHeaders(),
    });
  }
}

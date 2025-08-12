import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ServerService {
  private apiUrl = 'https://178.38.172.39'; // your backend domain

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders() {
    return { Authorization: `Bearer ${this.auth.getToken()}` };
  }

  getStatus() {
    return this.http.get<{ running: boolean }>(`${this.apiUrl}/status`, { headers: this.getAuthHeaders() });
  }

  startServer() {
    return this.http.post(`${this.apiUrl}/start`, {}, { headers: this.getAuthHeaders() });
  }

  stopServer() {
    return this.http.post(`${this.apiUrl}/stop`, {}, { headers: this.getAuthHeaders() });
  }
}

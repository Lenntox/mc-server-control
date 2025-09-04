import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

const API_URL = localStorage.getItem("serverIp");

@Injectable({ providedIn: 'root' })
export class ServerService {

  private http: HttpClient = inject(HttpClient)
  private auth: AuthService = inject(AuthService)

  private getAuthHeaders() {
    return { Authorization: `Bearer ${this.auth.getToken()}` };
  }

  getStatus() {
    return this.http.get<{ running: boolean }>(`${API_URL}/status`, { headers: this.getAuthHeaders() });
  }

  startServer() {
    return this.http.post(`${API_URL}/start`, {}, { headers: this.getAuthHeaders() });
  }

  stopServer() {
    return this.http.post(`${API_URL}/stop`, {}, { headers: this.getAuthHeaders() });
  }
}

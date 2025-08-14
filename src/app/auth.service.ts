import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

const { API_URL } = environment;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${API_URL}/login`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}

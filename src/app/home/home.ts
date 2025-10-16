import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ServerService } from '../server.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  running: boolean | null = null;
  loading = false;
  serverIp = localStorage.getItem('serverIp');
  error = '';

  private serverService: ServerService = inject(ServerService);
  private authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.loading = true;
    this.fetchStatus();
    setInterval(() => this.fetchStatus(), 5000);
  }

  fetchStatus() {
    this.serverService.getStatus().subscribe({
      next: (res) => {
        this.running = res.running;
        this.loading = false;
      },
      error: () => {
        this.running = null;
        this.loading = false;
        this.error = 'Error fetching status, try reloading page';
      },
    });
  }

  toggleServer() {
    if (this.running === null) return;
    this.loading = true;

    const action$ = this.running
      ? this.serverService.stopServer()
      : this.serverService.startServer();

    action$.subscribe({
      next: () => this.fetchStatus(),
      error: () => (this.loading = false),
    });
  }

  onRefresh() {
    this.ngOnInit();
  }

  onLogout() {
    this.authService.logout();
  }
}

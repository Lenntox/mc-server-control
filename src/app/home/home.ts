import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  running: boolean | null = null;
  loading = false;
  serverIp = localStorage.getItem("serverIp")

  private serverService: ServerService = inject(ServerService)

  ngOnInit() {
    this.fetchStatus();
  }

  fetchStatus() {
    this.loading = true;
    this.serverService.getStatus().subscribe({
      next: (res) => {
        this.running = res.running;
        this.loading = false;
      },
      error: () => {
        this.running = null;
        this.loading = false;
      }
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
      error: () => this.loading = false
    });
  }
}

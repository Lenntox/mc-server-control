import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ServerService } from '../server.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { McstatusService } from '../mcstatus.service';
import { MinecraftPlayerSample } from '../../mcstatus.model';

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

  version: string | undefined = undefined;
  playerCount: string | undefined = undefined;
  playerList: MinecraftPlayerSample[] | undefined = undefined;
  icon: string | null | undefined = undefined

  private infoInterval?: ReturnType<typeof setInterval>;

  private serverService: ServerService = inject(ServerService);
  private authService: AuthService = inject(AuthService);
  private mcstatusService: McstatusService = inject(McstatusService);

  ngOnInit() {
    this.loading = true;
    this.fetchInfo();
    this.infoInterval = setInterval(() => this.fetchInfo(), 1000);
  }

  private fetchInfo() {
    this.mcstatusService.loadStatusInfo()
    this.fetchStatus();
    this.fetchMcstatusInfo();
  }

  private fetchMcstatusInfo() {
    this.version = this.mcstatusService.getVersion();
    this.playerCount = this.mcstatusService.getPlayerCount();
    this.playerList = this.mcstatusService.getPlayerList();
    this.icon = this.mcstatusService.getServerIcon()
  }

  private fetchStatus() {
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
    clearInterval(this.infoInterval);
    this.loading = true;

    const action$ = this.running
      ? this.serverService.stopServer()
      : this.serverService.startServer();

    action$.subscribe({
      next: () =>
        (this.infoInterval = setInterval(() => this.fetchStatus(), 5000)),
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

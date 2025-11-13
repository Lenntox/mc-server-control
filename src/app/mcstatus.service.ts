import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Mcstatus } from '../mcstatus.model';

@Injectable({
  providedIn: 'root',
})
export class McstatusService {
  // https://mcstatus.io/docs

  private readonly http = inject(HttpClient);
  private readonly URL = 'https://api.mcstatus.io/v2/status/java/';
  private IP: string | null = null;
  private status: Mcstatus | null = null;

  public loadStatusInfo() {
    this.IP = localStorage.getItem('serverIp');
    this.http
      .get<Mcstatus>(`${this.URL}/${this.IP?.replace("https://", "")}`)
      .subscribe((res) => (this.status = res));
  }

  public getVersion() {
    return this.status?.version?.name_clean;
  }

  public getPlayerCount() {
    return `${this.status?.players?.online}/${this.status?.players?.max}`;
  }

  public getPlayerList() {
    return this.status?.players?.list;
  }

  public getServerIcon() {
    return this.status?.icon
  }
}

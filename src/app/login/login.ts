import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';
  serverIp = '';
  errorMessage = '';
  loading = false;
  hidePassword = true;

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  login() {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.username, this.password, this.serverIp).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token)
        this.loading = false;
        this.router.navigateByUrl('/home');
        localStorage.setItem("serverIp", this.serverIp)
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}

import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [{ path: "", component: Home, canActivate: [AuthGuard] }];

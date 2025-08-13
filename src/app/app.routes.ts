import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';
import { Login } from './login/login';

export const routes: Routes = [
    { path: "", component: Home, canActivate: [AuthGuard] },
    { path: "login", component: Login }
];

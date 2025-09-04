import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthGuard } from './auth.guard';
import { Login } from './login/login';

export const routes: Routes = [
    { path: "home", component: Home, canActivate: [AuthGuard], title: "MCSC | Home" },
    { path: "login", component: Login, title: "MCSC | Login" },
    { path: "**", redirectTo: "home"},
];

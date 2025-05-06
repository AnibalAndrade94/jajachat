import { Routes } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { HomeComponent } from './components/home/home.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthFormComponent },
    { path: 'home', component: HomeComponent },
  ];
  
import { Routes } from '@angular/router';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'chat', component: ChatComponent }
  ];
  
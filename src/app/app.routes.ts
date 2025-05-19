import { Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },  // DOMYŚLNA TRASA
  {path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  //{path: 'home', component: HomeComponent, canActivate: [authGuard]
  { path: '**', redirectTo: 'register' }
];

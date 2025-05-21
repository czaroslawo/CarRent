import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {authGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LayoutComponent} from './layout/layout.component';
import {AddAdComponent} from './add-ad/add-ad.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {path: 'add-ad', component: AddAdComponent, canActivate: [authGuard] },
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

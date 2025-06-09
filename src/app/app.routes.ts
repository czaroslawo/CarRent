import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {authGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LayoutComponent} from './layout/layout.component';
import {AddAdComponent} from './add-ad/add-ad.component';
import {RentItemScreenComponent} from './rent-item-screen/rent-item-screen.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'add-ad', component: AddAdComponent, canActivate: [authGuard] },
      {path: 'rent-item-screen/:id', component: RentItemScreenComponent},

    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

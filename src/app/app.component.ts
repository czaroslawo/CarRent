import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from './register/register.component';
import {RentItemComponent} from './rent-item/rent-item.component';
import {AuthService} from './auth.service';
import {take} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CaRent';
  isLoading = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().pipe(take(1)).subscribe(() => {
      this.isLoading = false;
    });
  }
}

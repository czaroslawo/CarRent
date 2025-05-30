import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: { email: string, password: string } = {email: '', password: ''}
  submitted : boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onLogin() {
    this.submitted = true;

    if (!this.user.email || !this.user.password) {
      return;
    }

    this.authService.login(this.user.email!, this.user.password!).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        console.log('loggedIn')
      },
      error: err => {
        console.log(err)
      }
    })
  }
}

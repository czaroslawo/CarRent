import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../Models/User';
import {NgClass, NgIf} from '@angular/common';
import {environment} from '../../environment/environment';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private router = inject(Router)
  private http = inject(HttpClient)
  constructor() {}

  submitted: boolean = false;

  samePassword: string = '';

  newUser: User = {
    name: '',
    email: '',
    password: ''
  }


  onRegister() {
    this.submitted = true;

    if (!this.newUser || !this.samePassword) {
      return;
    }
      console.log(this.newUser);
      this.http.post<User>(`${environment.apiUrl}/api/register`, this.newUser).subscribe({
        next: (res: any) => {console.log('User registered', res); this.router.navigate(['/home']);},
        error: (err: HttpErrorResponse) => {console.log(err)}
      })
    }

}

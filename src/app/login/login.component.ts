import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  @ViewChild('emailError') emailError!: ElementRef;
  @ViewChild('passwordError') passwordError!: ElementRef;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onLogin() {
    const email = this.emailInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    this.clearErrors();

    let isValid = true;


    if (!email) {
      isValid = false;
      this.showError(this.emailInput, this.emailError)
      this.emailError.nativeElement.textContent = "Email jest wymagany"
    } else if (!expression.test(email)) {
      isValid = false;
      this.showError(this.emailInput, this.emailError)
      this.emailError.nativeElement.textContent = "Email jest niepoprawny"
    }

    if (!password) {
      isValid = false;
      this.showError(this.passwordInput, this.passwordError)
      this.passwordError.nativeElement.textContent = "Hasło jest wymagane"
    }

    if(isValid) {
      this.authService.login(email!, password!).subscribe({
        next: () => {this.router.navigate(['/home']); console.log('loggedIn')},
        error: err => {console.log(err)}
      })
    }
  }

  showError(input: ElementRef, error: ElementRef) {
    input.nativeElement.classList.remove('border-gray-300');
    input.nativeElement.classList.add('border-red-500');
    error.nativeElement.classList.remove('hidden');
  }

  clearErrors() {
    const fields = [
      {input: this.emailInput, error: this.emailError},
      {input: this.passwordInput, error: this.passwordError},
    ];
    fields.forEach(field => {
      field.input.nativeElement.classList.remove('border-red-500');
      field.input.nativeElement.classList.add('border-gray-300');
      field.error.nativeElement.classList.add('hidden');
    });
  }

}

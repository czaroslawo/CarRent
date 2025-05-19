import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../enviornments/enviornment';
import {User} from '../../Models/User';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmInput') confirmInput!: ElementRef;

  @ViewChild('nameError') nameError!: ElementRef;
  @ViewChild('emailError') emailError!: ElementRef;
  @ViewChild('passwordError') passwordError!: ElementRef;
  @ViewChild('confirmError') confirmError!: ElementRef;

  constructor(private http: HttpClient) {}


  onRegister() {
    const name = this.nameInput.nativeElement.value.trim();
    const email = this.emailInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;
    const confirmPassword = this.confirmInput.nativeElement.value;
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const newUser: User = {
      name : name,
      email: email,
      password: password,
    };

    this.clearErrors();

    let isValid = true;

    if(!name){
      isValid = false;
      this.showError(this.nameInput, this.nameError)
    }
    if(!email){
      isValid = false;
      this.showError(this.emailInput, this.emailError)
      this.emailError.nativeElement.textContent = "Email jest wymagany"
    }else if(!expression.test(email)){
      isValid = false;
      this.showError(this.emailInput, this.emailError)
      this.emailError.nativeElement.textContent = "Email jest niepoprawny"
    }
    if(!password){
      isValid = false;
      this.showError(this.passwordInput, this.passwordError)
      this.passwordError.nativeElement.textContent = "Hasło jest wymagane"
    }else if(password.length < 6){
      isValid = false;
      this.showError(this.passwordInput, this.passwordError)
      this.passwordError.nativeElement.textContent = "Hasło musi mieć minimum 6 znaków"
    }

    if(password != confirmPassword){
      isValid = false;
      this.showError(this.confirmInput, this.confirmError)
    }
    if (isValid) {
      console.log('valid')
      console.log('About to send:', newUser);
      this.http.post<User>(`${environment.apiUrl}/api/register`, newUser).subscribe({
        next: (res: any) => {console.log('User registered', res)},
        error: (err: HttpErrorResponse) => {console.log(err)}
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
      { input: this.nameInput, error: this.nameError },
      { input: this.emailInput, error: this.emailError },
      { input: this.passwordInput, error: this.passwordError },
      { input: this.confirmInput, error: this.confirmError }
    ];
    fields.forEach(field => {
      field.input.nativeElement.classList.remove('border-red-500');
      field.input.nativeElement.classList.add('border-gray-300');
      field.error.nativeElement.classList.add('hidden');
    });
  }

}

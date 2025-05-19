import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, tap} from 'rxjs';
import {environment} from '../enviornments/enviornment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenKey = 'auth_token';
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  login(email: string, password: string){
    return this.http.post<{token: string}>(`${environment.apiUrl}/api/login`, {email, password})
      .pipe(
        tap(response =>{
          localStorage.setItem(this.tokenKey, response.token);
          this.isLoggedIn$.next(true);
          }
        )
      )
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken():string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(){
    return this.isLoggedIn$.asObservable();
  }

  private hasToken(): string | null{
    return typeof window !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
  }

  constructor() {
  }


}

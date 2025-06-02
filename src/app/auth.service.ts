import {Inject, inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, tap} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenKey = 'auth_token';
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const token = this.getToken();
    this.isLoggedIn$.next(!!token);
  }

  login(email: string, password: string){
    return this.http.post<{token: string}>(`${environment.apiUrl}/api/login`, {email, password})
      .pipe(
        tap(response =>{
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, response.token);
            this.isLoggedIn$.next(true);
          }
          }
        )
      )
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.isLoggedIn$.next(false);
      this.router.navigate(['/login']).then(r => true);
    }
  }

  getToken():string | null{
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(this.tokenKey)
      : null;
  }

  isAuthenticated(){
    return this.isLoggedIn$.asObservable();
  }

  private hasToken(): string | null{
    return typeof window !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
  }




}

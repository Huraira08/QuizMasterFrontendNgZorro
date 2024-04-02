import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResult } from 'src/app/interfaces/login-result';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

export interface TokenValidationResponse{
  isExpired: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLoggedIn: boolean = false;
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAuthenticated: boolean = false;
  private user!: User;
  private apiUrl = 'https://localhost:7129/api/Authentication'
  // private loginUrl = 'https://localhost:7129/api/Authentication/Login'

  private TOKEN_KEY = 'jwt_token';
  private USER_KEY = 'user';

  constructor(private http: HttpClient, private jtwHelper: JwtHelperService, private router: Router) { 
    let token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.isUserLoggedIn = true;
      this.isUserLoggedInSubject.next(this.isUserLoggedIn);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }

  isAdmin(): boolean{
    // return this.isAuthenticated
    const token = localStorage.getItem(this.TOKEN_KEY)
    if(token){
      const decodeToken = this.jtwHelper.decodeToken(token);
      const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      const roles = decodeToken[roleKey]
      return roles.includes('Admin')
    }
    return false;
  }

  RegisterUser(user: User){
    return this.http.post(this.apiUrl + '/Register', user).pipe();
  }
  login(user: User){
    return this.http.post<LoginResult>(this.apiUrl + '/Login', user).pipe();
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isUserLoggedIn = false;
    this.isUserLoggedInSubject.next(this.isUserLoggedIn);
  }

  setToken(token: string, user: User){
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isUserLoggedIn = true;
    this.isUserLoggedInSubject.next(this.isUserLoggedIn);
    this.user = user;
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isUserLoggedIn = false;
  }

  getUser(){
    const userData = localStorage.getItem(this.USER_KEY)
    if(userData){
      const user = JSON.parse(userData);
      // console.log(user);
      // console.log(localStorage.getItem(this.USER_KEY)!)
      return this.user;
    }
    return undefined;
  }

  validateToken(){
    const token = localStorage.getItem(this.TOKEN_KEY)
    if(token){
      const url = 'https://localhost:7129/api/Authentication/validate-token';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.get<TokenValidationResponse>(url, {headers}).subscribe({
        next: response=>{
          if(response.isExpired){
            this.clearToken();
            this.router.navigate(['/login']);
          }else{
            console.log("Token is valid")
          }
        },
        error: error=>{
          this.clearToken();
          this.router.navigate(['/login']);
          console.log(error)
        }
      })
    }
    else{
      this.clearToken();
      this.router.navigate(['/login']);
    }
  }
}

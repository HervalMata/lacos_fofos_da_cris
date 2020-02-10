import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../model";

const TOKEN_KEY = 'lacos_fofos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  me: User = null;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(user: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:8000/api/login', user)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  setToken(token: string) {
    this.setUserFromToken(token);
    token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  isAuth(): boolean {
    const token = this.getToken();
    return !new JwtHelperService().isTokenExpired(token, 30);
  }

  logout(): Observable<any> {
    return this.http.post<{ token: string }>('http://localhost:8000/api/logout', {})
      .pipe(
        tap(() => {
          this.setToken(null);
        })
      );
  }

  private setUserFromToken(token: string) {
    const decodedToken = new JwtHelperService().decodeToken(token);
    this.me = decodedToken ? {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
    } : null;
  }
}

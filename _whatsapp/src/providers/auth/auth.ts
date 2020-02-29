import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FirebaseAuthProvider} from "../firebase-auth/firebase-auth";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/observable/fromPromise";
import {flatMap} from "rxjs/operators";
import {User} from "../../app/model";
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from 'environments/environment';

const TOKEN_KEY = 'lacos_fofos_token';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  me: User = null;

  constructor(
    public http: HttpClient,
    private firebaseAuth: FirebaseAuthProvider
  ) {
    const token = this.getToken();
    this.setUserFromToken(token);
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

  private setUserFromToken(token: string) {
    const decodedToken = new JwtHelperService().decodeToken(token);
    this.me = decodedToken ? {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      profile: decodedToken.profile
    } : null;
  }

  login(): Observable<{ token: string }> {
    return fromPromise(this.firebaseAuth.getToken())
      .pipe(
        flatMap(token => {
          return this.http.post<{ token: string }>(`${environment.api.url}/login_vendor`, {token})
        })
      );
  }

}

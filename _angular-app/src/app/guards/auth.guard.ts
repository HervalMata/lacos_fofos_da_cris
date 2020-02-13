import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.isAuth();
    this.redirectIfUnauthenticaeted(isAuth);
    return true;
  }

  private redirectIfUnauthenticaeted(isAuth: boolean) {
    if (!isAuth) {
      this.router.navigate(['login'])
    }
  }
}

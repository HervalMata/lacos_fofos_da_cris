import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          this.setNewTokenIfResponseValid(event);
        })
      );
  }

  private setNewTokenIfResponseValid(event: HttpEvent<any>) {
    if (event instanceof HttpRequest) {
      const authorizationHeader = event.headers.get('authorization');
    }
  }
}

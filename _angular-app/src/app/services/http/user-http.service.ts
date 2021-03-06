import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../../model";
import {map} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private baseUrl = `${environment.api.url}/users`;
  private token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  // @ts-ignore
  list(searchParams: SearchParams): Observable<{ data: Array<User>, meta: any }> {
    //const sParams = new SearchParamsBuilder(searchParams).makeObject();
    //const params = new HttpParams({
    //fromObject: (<any>sParams)
    //});
    const params = new HttpParams({
      fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<User>, meta: any }>
    (this.baseUrl, {
      params
    });
  }

  get(id: number): Observable<User> {
    return this.http.get<{ data: User }>
    (`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  create(data: User): Observable<User> {
    return this.http.post<{ data: User }>
    (this.baseUrl, data,)
      .pipe(map(response => response.data));
  }

  update(id: number, data: User): Observable<User> {
    return this.http.put<{ data: User }>
    (`${this.baseUrl}/${id}`, data)
      .pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete
    (`${this.baseUrl}/${id}`);
  }
}

import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs/internal/Observable";
import {ProductInputs} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductInputHttpService {

  private baseUrl = `${environment.api.url}/inputs`;
  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  list(searchParams: SearchParams): Observable<{ data: Array<ProductInputs>, meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http.get<{ data: Array<ProductInputs>, meta: any }>
    (this.baseUrl, {
      params
    });
  }

  get(id: number): Observable<ProductInputs> {
    return this.http.get<{ data: ProductInputs }>
    (`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  create(data: ProductInputs): Observable<ProductInputs> {
    return this.http.post<{ data: ProductInputs }>
    (this.baseUrl, data,)
      .pipe(map(response => response.data));
  }
}

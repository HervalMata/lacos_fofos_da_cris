import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs/internal/Observable";
import {ProductOutputs} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductOutputHttpService {

  private baseUrl = `${environment.api.url}/outputs`;
  private token = window.localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  list(searchParams: SearchParams): Observable<{ data: Array<ProductOutputs>, meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http.get<{ data: Array<ProductOutputs>, meta: any }>
    (this.baseUrl, {
      params
    });
  }

  get(id: number): Observable<ProductOutputs> {
    return this.http.get<{ data: ProductOutputs }>
    (`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  create(data: ProductOutputs): Observable<ProductOutputs> {
    return this.http.post<{ data: ProductOutputs }>
    (this.baseUrl, data,)
      .pipe(map(response => response.data));
  }
}

import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs/internal/Observable";
import {Product, ProductPhoto} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  private baseApi = environment.api.url;
  private token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  list(productId: number): Observable<{ product: Product, photos: ProductPhoto[] }> {
    return this.http.get<{ data: any }>
    (this.getBaseUrl(productId))
      .pipe(
        map(response => response.data)
      );
  }

  create(productId: number, files: FileList): Observable<{ product: Product, photos: ProductPhoto[] }> {
    const formData = new FormData();
    const fillesArray = Array.from(files);

    fillesArray.forEach((file) => {
      formData.append('photos[]', file);
    });

    return this.http.post<any>(this.getBaseUrl(productId), formData);
  }

  update(productId: number, photoId: number, file: File): Observable<ProductPhoto> {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('_method', 'PUT');

    return this.http.post<any>(this.getBaseUrl(productId), formData)
      .pipe(
        map(response => response.data)
      );
  }

  destroy(productId: number, photoId: number) {
    return this.http.delete(this.getBaseUrl(productId, photoId), {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  private getBaseUrl(productId: number, photoId: number = null): string {
    let baseUrl = `${this.baseApi}/products/${productId}/photos`;
    if (photoId) {
      baseUrl == `/${photoId}`;
    }
    return baseUrl

  }
}

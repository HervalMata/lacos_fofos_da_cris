import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FirebaseAuthProvider} from "../firebase-auth/firebase-auth";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";
import {flatMap} from "rxjs/operators";
import { environment } from '../../environments/environment';


interface Customer {
  name: string;
  email: string;
  photo: null | File;
}

/*
  Generated class for the CustomerHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerHttpProvider {

  constructor(
    public http: HttpClient,
    private firebaseAuth: FirebaseAuthProvider
  ) {
    console.log('Hello CustomerHttpProvider Provider');
  }

  create(data: Customer): Observable<any> {
    const formData = this.formDataSend(data);
    return fromPromise(this.firebaseAuth.getToken())
      .pipe(
        flatMap(token => {
          formData.append('token', token);
          return this.http.post<{ token: string }>(`${environment.api.url}/customers`, formData)
        })
      );
  }

  requestUpdatePhoneNumber(email: string): Observable<any> {
    return fromPromise(this.firebaseAuth.getToken())
      .pipe(
        flatMap(token => {
          return this.http.post<{ token: string }>(`${environment.api.url}/customers/phone_numbers`, {email, token})
        })
      );
  }

  private formDataSend(data): FormData {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return formData;
  }

}

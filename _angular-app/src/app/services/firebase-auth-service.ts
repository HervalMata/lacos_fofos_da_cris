import {Injectable} from '@angular/core';
import firebaseConfig from '../../app/firebase-config';
import * as firebase from "firebase";
import scriptjs from 'scriptjs';

declare const firebaseui;
(<any>window).firebase = firebase;

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private ui;

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  get firebase() {
    return firebase;
  }

  async makePhoneNumberForm(selectorElement: string) {
    const firebaseui = await this.getFirebaseUI();
    const uiConfig = {
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          return false;
        }
      }
    };

    //const ui = new firebaseui.auth.AuthUI(firebase.auth());
    //ui.start(selectorElement, uiConfig);
  }

  getUser(): Promise<firebase.User | null> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return Promise.resolve(currentUser);
    }
    return new Promise((resolve, reject) => {
      const unsubscribed = this.firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
        unsubscribed();
      }, (error) => {
        reject(error);
        unsubscribed();
      });
    });
  }

  async getToken(): Promise<string> {
    try {
      const user = await this.getUser();
      if (!user) {
        throw new Error('User notfound!');
      }
      const token = await user.getIdTokenResult();
      return token.token;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  logout(): Promise<any> {
    return this.firebase.auth().signOut();
  }

  private makeFormFirebaseUI(SelectorElement, uiConfig) {
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start(SelectorElement, uiConfig);
    } else {
      this.ui.delete().then(() => {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start(SelectorElement, uiConfig);
      })
    }
  }

  private async getFirebaseUI(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (window.hasOwnProperty('firebaseui')) {
        resolve(firebaseui);
        return;
      }
      scriptjs('http://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui)
      });
    });
  }

  private getCurrentUser(): firebase.User | null {
    return this.firebase.auth().currentUser;
  }
}

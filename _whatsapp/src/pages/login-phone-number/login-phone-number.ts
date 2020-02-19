import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
import {AuthProvider} from "../../providers/auth/auth";
import {MainPage} from "../main/main";
import {CustomerCreatePage} from "../customer-create/customer-create";

/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider,
    private authService: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    this.firebaseAuth.getUser().then((token) => {
      const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.handleAuthUser();
          unsubscribed();
        }

      })
    });
    this.firebaseAuth.getToken().then((token) => {
      console.log(token), (error) => console.log(error);
    });
    this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
  }

  redirectToMainPage() {
    this.navCtrl.setRoot(MainPage);
  }

  redirectToCustomerCreatePage() {
    this.navCtrl.push(CustomerCreatePage);
  }

  private handleAuthUser() {
    this.authService.login()
      .subscribe((token) => {
        this.redirectToMainPage();
      }, (responseError) => {
        this.firebaseAuth.makePhoneNumberForm("#firebase-ui");
        this.redirectToCustomerCreatePage();
      })
  }
}

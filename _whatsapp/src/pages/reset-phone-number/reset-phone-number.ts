import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
import {FormControl, Validators} from "@angular/forms";
import {CustomerHttpProvider} from "../../providers/customer-http/customer-http";
import {LoginOptionsPage} from "../login-options/login-options";

/**
 * Generated class for the ResetPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-phone-number',
  templateUrl: 'reset-phone-number.html',
})
export class ResetPhoneNumberPage {

  email = new FormControl('', [Validators.required, Validators.email]);
  canShowFirebaseUI = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider,
    private customerHttp: CustomerHttpProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPhoneNumberPage');
  }

  showFirebaseUI() {
    this.canShowFirebaseUI = true;
    this.handleUpdate();
  }

  private handleUpdate() {
    this.firebaseAuth.makePhoneNumberForm("#firebase-ui")
      .then(() => {
        const email = this.email.value;
        this.customerHttp.requestUpdatePhoneNumber(email)
          .subscribe(() => {
            const alert = this.alertCtrl.create({
              title: 'Alerta',
              subTitle: `
              Um email com a validação da mudança foi enviado.
              Valide-o para logar com o novo telefone
              `,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.setRoot(LoginOptionsPage);
                  }
                }
              ]
            });
            alert.present();
          }, () => {
            const toast = this.toastCtrl.create({
              message: 'Não foi possível requisitar a alteração do telefone',
              duration: 3000
            });
            toast.present();
            this.handleUpdate();
          });
      });
  }
}

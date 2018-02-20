import {Component} from '@angular/core';
import {AlertController, LoadingController, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

import {AccountProvider} from '../../providers/account/account.provider';
import {LocalStorageProvider} from '../../providers/local-storage/local-storage.provider';

import {HomePage} from '../home/home';

import {APP} from '../../constants';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    email: string = "";
    password: string = "";
    schedule: string;


    constructor(
        public accountPrvdr: AccountProvider,
        public localstoragePrvdr: LocalStorageProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.menuCtrl.swipeEnable(false, 'menu');
        console.log("login");
        this.localstoragePrvdr.getToken().then((token: string) => {
            console.log(token);
            if(token != null && token != ""){
                this.navCtrl.setRoot("HomePage");
            }
        })
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    public login() {


        const load = this.loadingCtrl.create({content: "Loading"});
        load.present()
        this.checkFields().then((checked: boolean) => {
            if (checked) {
                this.accountPrvdr.login(this.email, this.password).then((result: {id_user, token}) => {
                    console.log(result)
                    this.localstoragePrvdr.saveToken(result.token).then(() => {
                        this.localstoragePrvdr.saveIdUser(result.id_user).then(() => {
                            
                            load.dismiss().then(() => {
                                this.navCtrl.setRoot("HomePage");
                            })
                        })


                    })
                }).catch((res: Response) => {
                    load.dismiss().then(() => {
                        if (res.status == 404) {
                            this.alertCtrl.create({title: APP.NAME, message: APP.STATUSCODE.SC404, buttons: [APP.BUTTONS.OK]}).present()
                        }
                        else {
                            this.alertCtrl.create({title: APP.NAME, message: APP.STATUSCODE.SC500, buttons: [APP.BUTTONS.OK]}).present()
                        }
                    })


                })
            }
            else {
                load.dismiss().then(() => {
                    this.alertCtrl.create({title: APP.NAME, message: APP.ERRORS.BLFIELDS, buttons: [APP.BUTTONS.OK]}).present()
                })
            }
        })


    }

    public checkFields(): Promise<boolean> {

        return new Promise((resolve) => {

            if (this.email.trim() != "" && this.password.trim() != "") {
                resolve(true);
            }
            resolve(false);
        })

    }

    public prova() {
        console.log(this.schedule);
    }

    public today() {
        return new Date().toISOString().substring(0, 10);
    }

}

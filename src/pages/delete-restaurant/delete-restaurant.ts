import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {LocalStorageProvider} from '../../providers/local-storage/local-storage.provider';
import {RestaurantProvider} from '../../providers/restaurant/restaurant.provider';

import {APP} from '../../constants';
/**
 * Generated class for the DeleteRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-delete-restaurant',
    templateUrl: 'delete-restaurant.html',
})
export class DeleteRestaurantPage {

    id_restaurant: number = 0;

    constructor(
        public localStoragePrvdr: LocalStorageProvider,
        public restaurantPrvdr: RestaurantProvider,
        public alertCtrl: AlertController,
        public loadCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DeleteRestaurantPage');
    }

    public deleteRestaurant() {

        const loading = this.loadCtrl.create({content: "Loading"});
        loading.present();

        this.localStoragePrvdr.getToken().then((token: string) => {

            this.restaurantPrvdr.deleteRestaurant(token, this.id_restaurant).then((res: Response) => {
                loading.dismiss().then(() => {
                    this.alertCtrl.create({
                        title: APP.NAME,
                        message: APP.MESSAGES.DELETED,
                        buttons: [APP.BUTTONS.OK]
                    }).present();
                })


            })

        })

    }


}

import {Component} from '@angular/core';
import {IonicPage, AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';

import {RestaurantProvider} from '../../providers/restaurant/restaurant.provider';

import {RestaurantModel} from '../../models/restaurant/restaurant.model';

import {LocalStorageProvider} from '../../providers/local-storage/local-storage.provider';

import {APP} from '../../constants';
/**
 * Generated class for the ViewRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-view-restaurant',
    templateUrl: 'view-restaurant.html',
})
export class ViewRestaurantPage {

    restaurant: RestaurantModel;
    seats: number = 1;
    schedule: string = "";

    constructor(
        public LocalStorageProvider: LocalStorageProvider,
        public restaurantProvdr: RestaurantProvider,
        public alertCtrl: AlertController,
        public loadCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams) {

        var id = this.navParams.get("idRest");

        this.LocalStorageProvider.getToken().then((token: string) => {

            this.restaurantProvdr.getRestaurant(id, token).then((res: RestaurantModel) => {
                this.restaurant = res;
            }).catch((errorCode: number) => {
                switch (errorCode) {
                    case 404:
                        this.alertCtrl.create({
                            title: APP.NAME,
                            message: APP.STATUSCODE.SC404,
                            buttons: [APP.BUTTONS.OK]
                        }).present();
                        this.navCtrl.pop();
                    case 500:
                        this.alertCtrl.create({
                            title: APP.NAME,
                            message: APP.STATUSCODE.SC500,
                            buttons: [APP.BUTTONS.OK]
                        }).present();
                }
                this.navCtrl.pop();
            })
        })
    }

    public today() {
        return new Date().toISOString().substring(0, 10);
    }

    public setBooking() {
        console.log(this.restaurant.id);
        console.log(this.seats);
        console.log(this.schedule);
        const load = this.loadCtrl.create({content: "Loading"});
        load.present();

        this.LocalStorageProvider.getToken().then((token: string) => {
            this.LocalStorageProvider.getIdUser().then((id_user: number) => {
                this.restaurantProvdr.setBooking(token, this.restaurant.id, id_user, this.schedule, this.seats).then(() => {
                    load.dismiss().then(() => {
                        this.alertCtrl.create({
                            title: APP.NAME,
                            message: APP.MESSAGES.BOOKING,
                            buttons: [APP.BUTTONS.OK]
                        }).present();
                        this.navCtrl.pop();
                    })
                }).catch(() => {
                    load.dismiss().then(() => {
                        this.alertCtrl.create({
                            title: APP.NAME,
                            message: APP.STATUSCODE.SC500,
                            buttons: [APP.BUTTONS.OK]
                        }).present();
                        this.navCtrl.pop();
                    })
                })
            })
            //this.restaurantProvdr.setBooking(token, this.restaurant.id)
        })



    }




}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {LocalStorageProvider} from '../../providers/local-storage/local-storage.provider';
import {RestaurantProvider} from '../../providers/restaurant/restaurant.provider';

import {RestaurantModel} from '../../models/restaurant/restaurant.model';
/**
 * Generated class for the UpdateRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-update-restaurant',
    templateUrl: 'update-restaurant.html',
})
export class UpdateRestaurantPage {

    id_restaurant: number = 0;
    seats: number = 0;
    address: string = "";

    constructor(
        public localStoragePrvdr: LocalStorageProvider,
        public restaurantPrvdr: RestaurantProvider,
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UpdateRestaurantPage');
    }

    public updateRestaurant() {



        this.localStoragePrvdr.getToken().then((token: string) => {
            this.restaurantPrvdr.getRestaurant(this.id_restaurant, token).then((restaurant: RestaurantModel) => {
                this.localStoragePrvdr.getIdUser().then((id: number) => {

                    var parameters;

                    if (this.seats == 0 && this.address.trim() != "") {
                        parameters = {
                            id: this.id_restaurant,
                            owner: id,
                            name: restaurant.name,
                            city: restaurant.city,
                            address: this.address,
                            cap: restaurant.cap,
                            telephoneNumber: restaurant.telephoneNumber,
                            style: restaurant.style,
                            menu: restaurant.menu,
                            maxSeats: restaurant.maxSeats,
                            discount: {
                                cinema: restaurant.discount.cinema,
                                price: restaurant.discount.price
                            },
                            cuisine: restaurant.cuisine,
                            lat: restaurant.location.lat,
                            lon: restaurant.location.lon
                        }
                    }

                    if (this.seats != 0 && this.address.trim() == "") {
                        parameters = {
                            id: this.id_restaurant,
                            owner: id,
                            name: restaurant.name,
                            city: restaurant.city,
                            address: restaurant.address,
                            cap: restaurant.cap,
                            telephoneNumber: restaurant.telephoneNumber,
                            style: restaurant.style,
                            menu: restaurant.menu,
                            maxSeats: this.seats,
                            discount: {
                                cinema: restaurant.discount.cinema,
                                price: restaurant.discount.price
                            },
                            cuisine: restaurant.cuisine,
                            lat: restaurant.location.lat,
                            lon: restaurant.location.lon
                        }
                    }

                    if (this.seats > 0 && this.address.trim() != "") {
                        parameters = {
                            id: this.id_restaurant,
                            owner: id,
                            name: restaurant.name,
                            city: restaurant.city,
                            address: this.address,
                            cap: restaurant.cap,
                            telephoneNumber: restaurant.telephoneNumber,
                            style: restaurant.style,
                            menu: restaurant.menu,
                            maxSeats: this.seats,
                            discount: {
                                cinema: restaurant.discount.cinema,
                                price: restaurant.discount.price
                            },
                            cuisine: restaurant.cuisine,
                            lat: restaurant.location.lat,
                            lon: restaurant.location.lon
                        }
                    }


                    console.log(parameters);
                    this.restaurantPrvdr.updateRestaurant(token, parameters);
                })
            })


        })

    }

}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {CinemaProvider} from '../../providers/cinema/cinema.provider';
import {LocalStorageProvider} from '../../providers/local-storage/local-storage.provider';
import {RestaurantProvider} from '../../providers/restaurant/restaurant.provider';

/**
 * Generated class for the InsertRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-insert-restaurant',
    templateUrl: 'insert-restaurant.html',
})
export class InsertRestaurantPage {

    name: string = "";
    city: string = "";
    address: string = "";
    cap: string = "";
    phone: string = "";
    style: string = "";
    menu: string = "";
    seats: number;
    cinema: number = 0;
    discount: number = 10;
    cuisine: string ="";
    lat: number = 0;
    lon: number = 0;
    
    cinemas: Array<{id: number, name: string}> = [];


    constructor(public cinemaPrvdr: CinemaProvider,
        public localStoragePrvdr: LocalStorageProvider,
        public restaurantPrvdr: RestaurantProvider,
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.localStoragePrvdr.getToken().then((token: string) => {
            this.cinemaPrvdr.getCinemas(token).then((res: Array<{id: number, name: string}>) => {
                console.log(res);
                this.cinemas = res;
            })
        })


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InsertRestaurantPage');
    }

    public insertRestaurant() {

        this.localStoragePrvdr.getToken().then((token: string) => {
            this.localStoragePrvdr.getIdUser().then((id: number) => {
                var parameters = {
                    owner: id,
                    name: this.name,
                    city: this.city,
                    address: this.address,
                    cap: this.cap,
                    telephoneNumber: this.phone,
                    style: this.style,
                    menu: this.menu,
                    maxSeats: this.seats,
                    discount:{
                        cinema: this.cinema,
                        price: this.discount
                    },
                    cuisine: this.cuisine,
                    lat: this.lat,
                    lon: this.lon
                }
                this.restaurantPrvdr.insertRestaurant(token, parameters)
            })
        }
        )


    }

    prova() {
        console.log(this.cinema);
    }


}

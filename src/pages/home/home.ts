import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, MenuController, IonicPage} from 'ionic-angular';

import {ViewRestaurantPage} from '../../pages/view-restaurant/view-restaurant';

import {CinemaProvider} from '../../providers/cinema/cinema.provider';
import {LocalStorageProvider} from '../../providers/local-storage/local-storage.provider';
import {ParallelProvider} from '../../providers/parallel/parallel.provider';
import {RestaurantProvider} from '../../providers/restaurant/restaurant.provider';


import {CinemaModel} from '../../models/cinema/cinema.model';
import {RestaurantModel} from '../../models/restaurant/restaurant.model';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
    /* constructor(public navCtrl: NavController, public navParams: NavParams)        }*/

    city: string = "";
    restaurants: Array<RestaurantModel> = [];
    cinemas: Array<{id: number, name: string}> = [];

    constructor(
        public loadingCtrl: LoadingController,
        public localStoragePrvdr: LocalStorageProvider,
        public parallelPrvdr: ParallelProvider,
        public restaurantPrvdr: RestaurantProvider,
        public cinemaPrvdr: CinemaProvider,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.menuCtrl.swipeEnable(true, 'menu')

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    public getRestAndCin() {
        const load = this.loadingCtrl.create({content: "loading"});
        load.present();
        this.localStoragePrvdr.getToken().then((token: string) => {
            this.parallelPrvdr.getCinemasAndRestaurants(token, this.city).then((rescin: {cinemas: Array<CinemaModel>, restaurants: Array<RestaurantModel>}) => {
                load.dismiss().then(() => {
                    this.restaurants = rescin.restaurants;
                    this.cinemas = rescin.cinemas;
                })

            }).catch(() => {
                load.dismiss().then(() => {
                    console.log("secondo catch");
                })
            })
        }).catch(() => {
            load.dismiss().then(() => {
                console.log("primo catch");
            })
        })

    }
    
    
    public clearToken() {
        this.localStoragePrvdr.saveToken("")
    }

    public viewRestaurant(id: any) {

        this.navCtrl.push(ViewRestaurantPage, {
            idRest: id
        });


    }

}

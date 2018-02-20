import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {CinemaModel} from '../../models/cinema/cinema.model';
import {RestaurantModel} from '../../models/restaurant/restaurant.model';

import {CinemaInterface} from '../../interfaces/cinema/cinema.interface';
import {RestaurantInterface} from '../../interfaces/restaurant/restaurant.interface';

import {APP} from '../../constants';

@Injectable()
export class ParallelProvider {

    constructor(public http: HttpClient) {
        console.log('Hello ParallelProvider Provider');
    }

    public getCinemasAndRestaurants(token: string, city: string): Promise<{cinemas: Array<CinemaModel>, restaurants: Array<RestaurantModel>}> {
        console.log(APP.IP.BASE + APP.IP.PARALLEL.BASE + token + APP.IP.PARALLEL.INFORMATION + city);
        return new Promise((resolve, reject) => {
            this.http.get(APP.IP.BASE + APP.IP.PARALLEL.BASE + token + APP.IP.PARALLEL.INFORMATION + city).toPromise().then((res: any) => {
                var cinemasRes: Array<CinemaModel> = [];
                var restaurantsRes: Array<RestaurantModel> = [];
                
                for (var r of res.restaurants) {

                    this.parseRestaurantJSON(r).then((restInter: RestaurantInterface) => {
                        restaurantsRes.push(new RestaurantModel(restInter));
                    })

                }
                
                for (var c of res.cinemas) {
                    this.parseCinemaJSON(c).then((cinemaInter: CinemaInterface) => {
                        cinemasRes.push(new CinemaModel(cinemaInter));
                    })
                }
                
                var result = {
                    cinemas: cinemasRes,
                    restaurants: restaurantsRes
                };
                
                console.log(result);
                
                resolve(result);
                
            }).catch(() => {
                reject();
            })
        })

    }

    public parseRestaurantJSON(restaurant: any): Promise<RestaurantInterface> {

        return new Promise((resolve, reject) => {
            var restInterface: RestaurantInterface = {
                id: restaurant.restaurantInfo.id,
                name: restaurant.restaurantInfo.name,
                address: restaurant.restaurantInfo.address,
                cap: restaurant.restaurantInfo.cap,
                city: restaurant.restaurantInfo.city,
                telephone: restaurant.restaurantInfo.telephoneNumber,
                style: restaurant.restaurantInfo.style,
                cuisine: restaurant.restaurantInfo.cuisine,
                menu: restaurant.restaurantInfo.menu,
                maxSeats: restaurant.restaurantInfo.maxSeats,
                discount: restaurant.restaurantInfo.discount != null ? {
                    id: restaurant.restaurantInfo.discount.id,
                    cinema: restaurant.restaurantInfo.discount.cinema,
                    price: restaurant.restaurantInfo.discount.price
                } : null,
                location: {
                    lat: restaurant.lat,
                    lon: restaurant.lon,
                }
            }

            resolve(restInterface);

        })
    }

    public parseCinemaJSON(cinema: any): Promise<CinemaInterface> {

        return new Promise((resolve) => {
            var cinemaInterface: CinemaInterface = {
                id: cinema.cinemaInfo.idCinema,
                name: cinema.cinemaInfo.name,
                address: cinema.cinemaInfo.address,
                cap: cinema.cinemaInfo.cap,
                city: cinema.cinemaInfo.city,
                telephoneNumber: cinema.cinemaInfo.telephoneNumber,
                location: {
                    longitude: cinema.cinemaInfo.lon,
                    lat: cinema.cinemaInfo.lat
                }
            }
            resolve(cinemaInterface);
        })

    }

}

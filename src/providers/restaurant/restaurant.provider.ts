import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {RestaurantInterface} from '../../interfaces/restaurant/restaurant.interface';
import {RestaurantModel} from '../../models/restaurant/restaurant.model';

import {APP} from '../../constants';
/*
  Generated class for the RestaurantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestaurantProvider {

    constructor(public http: HttpClient) {
        console.log('Hello RestaurantProvider Provider');
    }

    public getRestaurantsByCity(city: string, token: string): Promise<Array<RestaurantModel>> {

        return new Promise((resolve, reject) => {

            this.http.get(APP.IP.BASE + APP.IP.RESTAURANT.BASE + token + APP.IP.RESTAURANT.INFORMATION.BYCITY + city).toPromise().then((res: any) => {
                var arrayRestaurant: Array<RestaurantModel> = [];
                for (var x of res.restaurants) {
                    this.parseJSON(x).then((res) => {
                        var resModel = new RestaurantModel(res);
                        arrayRestaurant.push(resModel);
                    })
                }
                console.log(arrayRestaurant);
                resolve(arrayRestaurant);
                
            }).catch((res: Response) => {

                reject(res);

            })
        })


    }
    
    public setBooking(token: string, id_restaurant: number, id_user: number, schedule: string, seats: number){
        
        var parameters = {
            restaurant: id_restaurant,
            user: id_user,
            seats: seats,
            schedule: schedule
            
        };
        console.log(parameters);
        return new Promise((resolve, reject) => {
            this.http.post(APP.IP.BASE + APP.IP.RESTAURANT.BASE + token + APP.IP.RESTAURANT.BOOKING, parameters).toPromise().then(() => {
                resolve()
        }).catch((res: Response) => {
            reject(res);
        })
        
        })
        
    }
    

    public getRestaurant(id: number, token: string): Promise<RestaurantModel> {

        return new Promise((resolve, reject) => {
            this.http.get(APP.IP.BASE + APP.IP.RESTAURANT.BASE + token + APP.IP.RESTAURANT.INFORMATION.SINGLE + id).toPromise().then((res: any) => {

                this.parseJSON(res.restaurant).then((restInterface: RestaurantInterface) => {
                    var restaurant = new RestaurantModel(restInterface);
                    resolve(restaurant);

                })


            }).catch((res: Response) => {
               
                reject(res.status);
               
            })

        })

    }
    
    public insertRestaurant(token: string, parameters: any): Promise<any>{
        console.log(parameters);
        return new Promise((resolve, reject) => {
            this.http.post(APP.IP.BASE + APP.IP.RESTAURANT.BASE + token + APP.IP.RESTAURANT.INSERT, parameters).toPromise().then(() => {
                
            })
        })
        
    }
    
    public deleteRestaurant(token: string, id_restaurant: number): Promise<any>{
        return new Promise((resolve, reject) => {
            this.http.delete(APP.IP.BASE + APP.IP.RESTAURANT.BASE + token + APP.IP.RESTAURANT.DELETE + id_restaurant).toPromise().then((res: Response) => {
                resolve(res);
            }).catch((res: Response) => {
                reject(res);
            })
        })
    }
    
    public updateRestaurant(token: string, parameters: any): Promise<any>{
        
        return new Promise((resolve, reject) => {
            this.http.put(APP.IP.BASE + APP.IP.RESTAURANT.BASE + token + APP.IP.RESTAURANT.UPDATE, parameters).toPromise().then((res) => {
                resolve();
            })
        })
        
    }


    public parseJSON(restaurant: any): Promise<RestaurantInterface> {

        return new Promise((resolve, reject) => {
            var restInterface: RestaurantInterface = {
                id: restaurant.restaurantInfo.id,
                name: restaurant.restaurantInfo.name,
                address: restaurant.restaurantInfo.address,
                city: restaurant.restaurantInfo.city,
                cap: restaurant.restaurantInfo.cap,
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
    
    

}

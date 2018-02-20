import {RestaurantInterface} from '../../interfaces/restaurant/restaurant.interface';

export class RestaurantModel {

    id: number;
    name: string;
    address: string;
    city: string;
    cap: string;
    telephoneNumber: string;
    style: string;
    cuisine: string;
    menu: string;
    maxSeats: number;
    location: {
        lat: number;
        lon: number;
    };
    discount: {
        id: number,
        cinema: number;
        price: number;
    };

    public constructor(restInter: RestaurantInterface) {
        console.log(restInter.location.lat);
        this.id = restInter.id || this.id;
        this.name = restInter.name || this.name
        this.address = restInter.address || this.address;
        this.city = restInter.city || this.city;
        this.cap = restInter.cap || this.cap;
        this.telephoneNumber = restInter.telephone || this.telephoneNumber;
        this.style = restInter.style || this.style;
        this.cuisine = restInter.cuisine || this.cuisine;
        this.menu = restInter.menu || this.menu;
        this.maxSeats = restInter.maxSeats || this.maxSeats;
        this.discount = restInter.discount != null ? {
            id: restInter.discount.id,
            cinema: restInter.discount.cinema,
            price: restInter.discount.price
        } : null;
        this.location = restInter.location != null ? {
            lat: restInter.location.lat,
            lon: restInter.location.lon
        }: null;

    }


}
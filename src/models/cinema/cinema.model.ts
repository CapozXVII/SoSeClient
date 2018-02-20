/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
import {CinemaInterface} from '../../interfaces/cinema/cinema.interface';



export class CinemaModel {
    
    id: number;
    name: string;
    cap: string;
    address: string;
    city: string;
    telephoneNumber: string;
    location: {
        lat: number;
        lon: number;
    };

    constructor(cinemaInt: CinemaInterface){
        
        this.id = cinemaInt.id;
        this.name = cinemaInt.name;
        this.cap = cinemaInt.cap;
        this.address = cinemaInt.address;
        this.city = cinemaInt.city;
        this.telephoneNumber = cinemaInt.telephoneNumber;
        this.location = {
            lat: cinemaInt.location.lat,
            lon: cinemaInt.location.longitude
        };
        
    }
    
}
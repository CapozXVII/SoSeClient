/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export interface RestaurantInterface {
    
    id: number;
    name: string;
    address: string;
    city: string;
    cap: string;
    telephone: string;
    style: string;
    cuisine: string;
    menu: string;
    maxSeats: number;
    discount: {
        id: number;
        cinema: number;
        price: number;
    };
    location: {
        lat: number;
        lon: number;
    };
    
    
}
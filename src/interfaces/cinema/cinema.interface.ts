/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export interface CinemaInterface {
    
    id: number;
    name: string;
    cap: string;
    address: string;
    city: string;
    telephoneNumber: string;
    location: {
        lat: number;
        longitude: number;
    }
    
}

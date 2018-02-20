import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {APP} from '../../constants';
/*
  Generated class for the CinemaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CinemaProvider {

    constructor(public http: HttpClient) {
        console.log('Hello CinemaProvider Provider');
    }

    public getCinemas(token: string): Promise<Array<{id: number, name: string}>> {

        return new Promise((resolve, reject) => {

            this.http.get(APP.IP.BASE + APP.IP.CINEMA.BASE + token + APP.IP.CINEMA.INFORMATION.BYCITY + "Rome").toPromise().then((res: any) => {
                console.log(res.cinemas);
                var resultArray: Array<{id: number, name: string}> = [];
                for (var x of res.cinemas) {
                    this.parseJSON(x).then((res) => {
                        resultArray.push(res);
                    })
                }
                
                resolve(resultArray);

            })

        })

    }


    public parseJSON(cinema: any): Promise<{id: number, name: string}> {
        return new Promise((resolve) => {
            var result = {
                id: cinema.cinemaInfo.idCinema,
                name: cinema.cinemaInfo.name
            }
            console.log(result);
            resolve(result);

        })


    }

}

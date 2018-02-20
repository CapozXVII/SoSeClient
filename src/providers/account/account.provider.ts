import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {APP} from '../../constants';

import {AlertController} from 'ionic-angular';
@Injectable()
export class AccountProvider {


    constructor(public http: HttpClient, public alertCtrl: AlertController) {

    }
    public login(user_email: string, user_password: string): Promise<any> {

        var parameters = {
            email: user_email,
            password: user_password
        };

        return new Promise((resolve, reject) => {

            this.http.post(APP.IP.BASE + APP.IP.ACCOUNT.LOGIN, parameters).toPromise().then((res: any) => {
                
                var result = {
                    id_user: res.id,
                    token: res.token
                }
                
                resolve(result);
                
            }).catch((res: Response) => {
                
                reject(res);
            
            })

        })

    }
    
    public logout(token: string): Promise<any>{
        return new Promise((resolve, reject) => {
            
            this.http.delete(APP.IP.BASE + APP.IP.ACCOUNT.LOGOUT + token).toPromise().then(() => {
                resolve();
            }).catch(() => {
                reject();
            })
            
        })
    }

}

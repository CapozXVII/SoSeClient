import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {APP} from '../../constants';
/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

    constructor(public store: Storage) {
        console.log('Hello LocalStorageProvider Provider');
    }

    public saveToken(token: string): Promise<any> {
        return new Promise((resolve) => {
            this.store.set(APP.STORAGE_KEYS.TOKEN, token).then(() => resolve());
        })

    }

    public getToken(): Promise<string> {

        return new Promise((resolve) => {
            this.store.get(APP.STORAGE_KEYS.TOKEN).then((token: string) => {
                resolve(token);
            })
        })

    }
    
    public saveIdUser(id: number): Promise<any> {
        return new Promise((resolve) => {
            this.store.set(APP.STORAGE_KEYS.ID_USER, id).then(() => {
                resolve();
            })
        })
    }
    
    public getIdUser(): Promise<number> {
        return new Promise((resolve) => {
            this.store.get(APP.STORAGE_KEYS.ID_USER).then((id_user: number) => {
                resolve(id_user);
            })
        })
    } 

}

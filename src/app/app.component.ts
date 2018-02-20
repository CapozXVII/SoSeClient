import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform, LoadingController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {DeleteRestaurantPage} from '../pages/delete-restaurant/delete-restaurant';
import {InsertRestaurantPage} from '../pages/insert-restaurant/insert-restaurant';
import {UpdateRestaurantPage} from '../pages/update-restaurant/update-restaurant';

import {LoginPage} from '../pages/login/login';

import {AccountProvider} from '../providers/account/account.provider';
import {LocalStorageProvider} from '../providers/local-storage/local-storage.provider';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = LoginPage;

    pages: Array<{title: string, component: any}>;

    constructor(public menuCtrl: MenuController, public loadingCtrl: LoadingController, public accountPrvdr: AccountProvider, public localStoragePrvdr: LocalStorageProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        
        this.pages = [
            {title: "HomePage", component: HomePage},
            {title: 'InsertRestaurant', component: InsertRestaurantPage},
            {title: 'DeleteRestaurant', component: DeleteRestaurantPage},
            {title: 'UpdateRestaurant', component: UpdateRestaurantPage}
        ];
        platform.ready().then(() => {                // Okay, so the platform is ready and our plugins are avail                  // Here you can do any higher level native things you might need.

            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    openPage(page: any) {
        this.nav.setRoot(page.component);
    }

    public logout() {
        const loading = this.loadingCtrl.create({content: "loading"});
        loading.present();
        this.localStoragePrvdr.getToken().then((token: string) => {
            this.accountPrvdr.logout(token).then(() => {
                this.localStoragePrvdr.saveToken("").then(() => {
                    loading.dismiss().then(() => {
                        this.menuCtrl.close('menu').then(() => {
                            this.nav.setRoot(LoginPage);
                        })
                        
                    })

                }).catch(() => {
                    loading.dismiss().then(() => {
                        
                    })
                });
            }).catch(() => {
                loading.dismiss().then(() => {

                })
            })
        }).catch(() => {
            loading.dismiss().then(() => {

            })
        })

    }
}


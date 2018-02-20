import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {DeleteRestaurantPage} from '../pages/delete-restaurant/delete-restaurant';
import {InsertRestaurantPage} from '../pages/insert-restaurant/insert-restaurant';
import {UpdateRestaurantPage} from '../pages/update-restaurant/update-restaurant';
import {ViewRestaurantPage} from '../pages/view-restaurant/view-restaurant';
import {AccountProvider} from '../providers/account/account.provider';
import {CinemaProvider} from '../providers/cinema/cinema.provider';
import {LocalStorageProvider} from '../providers/local-storage/local-storage.provider';
import {IonicStorageModule} from '@ionic/storage';
import {RestaurantProvider} from '../providers/restaurant/restaurant.provider';
import {ParallelProvider} from '../providers/parallel/parallel.provider';

@NgModule({
    declarations: [
        MyApp,
        ViewRestaurantPage,
        InsertRestaurantPage,
        LoginPage,
        DeleteRestaurantPage,
        UpdateRestaurantPage
    ],
    imports: [
        BrowserModule,
        IonicStorageModule.forRoot(),
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        InsertRestaurantPage,
        ViewRestaurantPage,
        DeleteRestaurantPage,
        UpdateRestaurantPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        HttpClient,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AccountProvider,
        CinemaProvider,
        LocalStorageProvider,
        RestaurantProvider,
    ParallelProvider,
        
    ]
})
export class AppModule {}

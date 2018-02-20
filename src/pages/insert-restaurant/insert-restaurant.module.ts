import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertRestaurantPage } from './insert-restaurant';

@NgModule({
  declarations: [
    InsertRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertRestaurantPage),
  ],
})
export class InsertRestaurantPageModule {}

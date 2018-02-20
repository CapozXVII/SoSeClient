import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateRestaurantPage } from './update-restaurant';

@NgModule({
  declarations: [
    UpdateRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateRestaurantPage),
  ],
})
export class UpdateRestaurantPageModule {}

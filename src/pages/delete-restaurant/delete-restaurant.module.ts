import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteRestaurantPage } from './delete-restaurant';

@NgModule({
  declarations: [
    DeleteRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteRestaurantPage),
  ],
})
export class DeleteRestaurantPageModule {}

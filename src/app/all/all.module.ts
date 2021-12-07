import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPageRoutingModule } from './all-routing.module';

import { AllPage } from './all.page';
import { ModalModule } from '../Modals/modalComponent.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AllPageRoutingModule
  ],
  declarations: [AllPage],
})
export class AllPageModule { }

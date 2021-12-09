import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddModalComponent } from "./add-modal/add-modal.component";
import { EditModalComponent } from "./edit-modal/edit-modal.component";
import { AddDetailsComponent } from './add-details/add-details.component';



@NgModule({

    declarations: [EditModalComponent, AddModalComponent, AddDetailsComponent],
    exports: [EditModalComponent, AddModalComponent, AddDetailsComponent],
    imports: [ReactiveFormsModule, FormsModule, IonicModule, CommonModule]
})
export class ModalModule { }
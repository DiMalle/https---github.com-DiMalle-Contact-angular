import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddModalComponent } from "./add-modal/add-modal.component";
import { EditModalComponent } from "./edit-modal/edit-modal.component";
import { AddDetailsComponent } from './add-details/add-details.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { SharedModule } from './shared.module';



@NgModule({

    declarations: [EditModalComponent, AddModalComponent, AddDetailsComponent, EditDetailComponent],
    exports: [EditModalComponent, AddModalComponent, AddDetailsComponent, EditDetailComponent],
    imports: [ReactiveFormsModule, FormsModule, IonicModule, CommonModule, SharedModule]
})
export class ModalModule { }
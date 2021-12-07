import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  public IMAGE_URL: string = environment.basedApiServer + '/contact/file/';
  public emptyImage: string = 'assets/no-image.jpg';


  constructor(private modal: ModalController) { }
  public dismissModal() {
    this.modal.dismiss();
  }

}

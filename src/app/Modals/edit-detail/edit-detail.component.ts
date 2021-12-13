import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DetailContact } from 'src/app/interface/detail-contact';
import { DetailService } from 'src/app/Services/detail.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
})
export class EditDetailComponent implements OnInit {
  public update: DetailContact;
  public infoContact: DetailContact;
  info;
  contact;
  public editForm: FormGroup;
  constructor(private modal: ModalController, private detailService: DetailService, private formBuild: FormBuilder) { }

  ngOnInit() {
    console.log(this.contact);
    console.log(this.info);

  }

  public dismissModal() {
    this.modal.dismiss();
  }
  public onUpdateDetail(editForm: NgForm) {
    this.update = editForm.value;
    this.update.contact = this.contact
    this.detailService.updateDetails(this.update).subscribe(
      data => {
        console.log("details updated", data);
        this.modal.dismiss();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}

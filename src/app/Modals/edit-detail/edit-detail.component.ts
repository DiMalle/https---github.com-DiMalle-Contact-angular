import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  detail;
  contact;
  public editForm: FormGroup;
  constructor(private modal: ModalController, private detailService: DetailService, private formBuild: FormBuilder) { }

  ngOnInit() {
    console.log(this.detail);
    this.formCtrl();
  }
  public formCtrl() {
    this.editForm = this.formBuild.group({
      type: ['', Validators.required],
      number: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      id: ['',]
    })
  }
  public dismissModal() {
    this.modal.dismiss();
  }
  public onUpdateDetail() {
    this.update = this.editForm.value;
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

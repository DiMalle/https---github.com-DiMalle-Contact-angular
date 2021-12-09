import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/interface/contact';
import { DetailContact } from 'src/app/interface/detail-contact';
import { DetailService } from 'src/app/Services/detail.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss'],
})
export class AddDetailsComponent implements OnInit {

  public addForm: FormGroup;
  public contact: Contact;
  public detail: DetailContact;

  constructor(private modal: ModalController, private formBuild: FormBuilder, private detailService: DetailService) { }

  ngOnInit() {
    this.onThis();
  }

  public onThis() {
    this.addForm = this.formBuild.group({
      type: ['', Validators.required],
      number: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])]
    })
  }

  public dismissModal() {
    this.modal.dismiss();
  }
  public addDetails() {
    this.detail = this.addForm.value;
    this.detail.contact = this.contact;
    this.detailService.addDetails(this.detail).subscribe(
      data => {
        console.log("new contact type added", data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}

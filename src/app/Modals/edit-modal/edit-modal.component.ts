import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/interface/contact';
import { ContactService } from 'src/app/Services/contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public IMAGE_URL: string = environment.basedApiServer + '/contact/file/';
  public emptyImage: string = 'assets/no-image.jpg';
  public selectedImage: string;
  public item: Contact;
  public updateForm: FormGroup;

  constructor(private modal: ModalController, private service: ContactService, private formBuild: FormBuilder) { }

  ngOnInit() {
    this.onForm();
  }
  public dismissModal() {
    this.modal.dismiss();
  }
  public onForm() {
    this.updateForm = this.formBuild.group({
      name: ["", Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(2)])],
      surName: ["", Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.required])],
      address: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      cellphone: ["", Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])]
    })
  }

  public onUpdate() {
    this.item = this.updateForm.value;
    this.item.imageStringBase64 = this.selectedImage;
    this.service.updateContact(this.item).subscribe(
      data => {
        console.log("Contact updated and its new details are ->", data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

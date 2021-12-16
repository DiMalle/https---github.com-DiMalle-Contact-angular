import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
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
  editContact: Contact;
  // public img: string;
  imageData: string = '';

  constructor(private modal: ModalController, private service: ContactService, private formBuild: FormBuilder) { }

  ngOnInit() {
    this.imageData = this.editContact.imageUrl;
    console.log("show me this", this.editContact);

    this.onForm();
  }
  public dismissModal() {
    this.modal.dismiss();
  }
  public onForm() {
    if (this.editContact) {
      return this.updateForm = this.formBuild.group({
        name: [this.editContact.name, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(2)])],
        surName: [this.editContact.surName, Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.required])],
        address: [this.editContact.address, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
        email: [this.editContact.email, Validators.compose([Validators.email, Validators.required])],
        cellphone: [this.editContact.cellphone, Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
        id: [this.editContact.id],
        contactCode: [this.editContact.contactCode],
        favorite: [this.editContact.favorite]
      });
    }
    this.updateForm = this.formBuild.group({
      name: ["", Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(2)])],
      surName: ["", Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.required])],
      address: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      cellphone: ["", Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      id: ["",],
      contactCode: ["",],
      favorite: [this.editContact.favorite],
    });
  }
  /*   public getImage(imageName) {
      this.service.showImage(imageName).subscribe(
        data => {
          this.img = JSON.parse(data)
          console.log("this is my image", this.img);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    } */

  public onUpdate() {

    this.item = this.updateForm.value;
    this.item.imageStringBase64 = this.imageData;
    // console.log("IMAGE", this.item.imageStringBase64);

    this.service.updateContact(this.item).subscribe(
      data => {
        console.log("Contact updated and its new details are ->", data);
        this.modal.dismiss();
        //  location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  async takepic() {
    Camera.getPhoto({
      resultType: CameraResultType.Base64,
    }).then((res) => {

      const format = res.format;
      const data = res.base64String;
      this.imageData = 'data:image/' + format + ';base64,' + data;
      //  console.log('image:', this.imageData);
      return this.imageData;
    }).catch((err) => {
      console.log(err);
    });
  }
}

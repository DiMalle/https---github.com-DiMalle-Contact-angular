import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Contact } from 'src/app/interface/contact';
import { User } from 'src/app/interface/user';
import { ContactService } from 'src/app/Services/contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  public addForm: FormGroup;
  public user: User;
  public contact: Contact;
  public selectedImage: string;
  public IMAGE_URL: string = environment.basedApiServer + '/contact/file/';
  public emptyImage: string = 'assets/no-image.jpg';
  imageData: string;

  constructor(private fb: FormBuilder, private modal: ModalController, private contactService: ContactService) { }

  ngOnInit() {
    // this.trythis();
    this.inIt();

  }

  ionViewWillEnter() {

  }

  public dismissModal() {
    this.modal.dismiss();
  }

  public inIt() {

    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.required])],
      surName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      cellphone: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])]
    });
  }

  /*   public trythis() {
      this.addForm = this.fb.group({
        name: FormControl('', [Validators.required]),
        surName: FormControl('', [Validators.required]),
        email: FormControl('', [Validators.required]),
        address: FormControl('', [Validators.required]),
        cellphone: FormControl('', [Validators.required])
      })
    } */
  /*   async takepic() {
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
   */
  public addContact() {
    console.log("this", this.addForm.value);

    const userString = localStorage.getItem("user");
    if (userString === null || userString === undefined)
      return;
    this.user = JSON.parse(userString);
    this.contact = this.addForm.value;
    this.contact.imageStringBase64 = this.selectedImage;
    this.contactService.addContactWIthImageAndId(this.user.id, this.contact).subscribe(
      data => {
        console.log("contact added to the list =>", data);
        this.addForm.reset();
        location.reload();
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
      this.selectedImage = 'data:image/' + format + ';base64,' + data;
      //  console.log('image:', this.imageData);
      return this.selectedImage;
    }).catch((err) => {
      console.log(err);
    });
  }
}

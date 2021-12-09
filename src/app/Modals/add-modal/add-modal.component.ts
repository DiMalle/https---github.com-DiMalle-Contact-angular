import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Contact } from 'src/app/interface/contact';
import { User } from 'src/app/interface/user';
import { ContactService } from 'src/app/Services/contact.service';

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

  // public trythis() {
  //   this.addForm = this.fb.group({
  //     name: FormControl('', [Validators.required]),
  //     surName: FormControl('', [Validators.required]),
  //     email: FormControl('', [Validators.required]),
  //     address: FormControl('', [Validators.required]),
  //     cellphone: FormControl('', [Validators.required])
  //   })
  // }

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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

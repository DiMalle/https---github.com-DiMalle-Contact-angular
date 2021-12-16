import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Contact } from '../interface/contact';
import { User } from '../interface/user';
import { AddModalComponent } from '../Modals/add-modal/add-modal.component';
import { EditModalComponent } from '../Modals/edit-modal/edit-modal.component';
import { ContactService } from '../Services/contact.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {
  user: User;
  contacts: Contact[];
  contact: Contact;
  public IMAGE_URL: string = environment.basedApiServer + '/contact/file/';
  public emptyImage: string = 'assets/no-image.jpg';

  constructor(private contactService: ContactService, private modalCtrl: ModalController, private route: Router) { }

  ngOnInit() {
    this.getContact();
  }

  public async onOpenModalEdit(contact: Contact) {
    const modal = await this.modalCtrl.create({
      component: EditModalComponent,
      componentProps: {
        editContact: contact,
      }

    });
    await modal.present();
  }
  public async onOpenModalAdd() {
    const addModal = await this.modalCtrl.create({
      component: AddModalComponent
    });
    await addModal.present();
  }
  public getContact() {
    const userString = localStorage.getItem("user");
    if (userString === undefined || userString === null) return;
    this.user = JSON.parse(userString);
    console.log("user in local", this.user);
    this.contactService.getContactByUserId(this.user.id).subscribe(
      data => {
        this.contacts = data;
        console.log("List of our contacts", this.contacts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public deleteContact(id: number) {
    this.contactService.deleteContactByID(id).subscribe(
      (response: void) => {
        console.log("Element deleted");
        this.getContact();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // public goToDetails(contact) {
  // this.route.navigateByUrl('/details?contact=' + contact.id);
  // }
  public goToDetails(contact) {
    this.route.navigateByUrl('details?contact=' + contact.id)
  }
}

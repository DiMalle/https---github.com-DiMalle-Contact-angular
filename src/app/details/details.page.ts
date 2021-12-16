import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Contact } from '../interface/contact';
import { DetailContact } from '../interface/detail-contact';
import { AddDetailsComponent } from '../Modals/add-details/add-details.component';
import { EditDetailComponent } from '../Modals/edit-detail/edit-detail.component';
import { DetailService } from '../Services/detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() addedToFavorite: boolean
  public contactId: any;
  public detailsContact: DetailContact[];
  public contact: Contact;
  public addContact: any[];
  public IMAGE_URL: string = environment.basedApiServer + '/contact/file/';
  public emptyImage: string = 'assets/no-image.jpg';
  contactService: any;
  constructor(private route: Router, private activeRoute: ActivatedRoute, private detailService: DetailService, private modalCtrl: ModalController, private alert: AlertController) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(
      data => {
        this.contactId = data['contact'];
        console.log('contact ID===', this.contactId);


        this.detailById(this.contactId);
        this.requestDetails(this.contactId);
      }
    )
  }
  public async onOpenModalEdit(infoContact: DetailContact, index: number) {
    /*
        console.log("message contact", infoContact);
        console.log("index contact", index);
    */
    const edit = await this.modalCtrl.create({
      component: EditDetailComponent,
      componentProps: {
        info: infoContact,
        contact: this.contact
      }
    });
    await edit.present();
  }
  public async onOpenModalNew() {
    const modal = await this.modalCtrl.create({
      component: AddDetailsComponent,
      componentProps: {
        contact: this.contact
      }
    });
    await modal.present();
  }
  public back() {
    this.route.navigate(['/all']);
  }
  public detailById(contactId) {

    this.detailService.getContactById(contactId).subscribe(
      response => {
        this.contact = response;
        console.log("found contact", this.contact);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public requestDetails(contact) {
    this.detailService.getDetailsById(contact).subscribe(
      data => {
        this.detailsContact = data;
        console.log("contact details", this.detailsContact);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public deleteDetail(id) {
    this.detailService.deleteDetailById(id).subscribe(
      data => {
        console.log("deleted", data);
        this.requestDetails(this.contactId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  handleAddToFavorite(contact: Contact) {
    this.contactService.addToFavorite(contact.id).subscribe((res) => {


      console.log("****************resp object***********", res);
      console.log("***************************", contact.id);
      this.addedToFavorite = true;
      this.requestDetails(this.contactId);
    })
  }
  handleRemoveFromFavorite(contact: Contact) {
    this.contactService.addToFavorite(contact.id).subscribe((res) => {
      console.log("********************resp object*****", res);
      console.log("********************resp object*****", contact.id);
      this.addedToFavorite = false;
      this.requestDetails(this.contactId);
    })
  }
}
